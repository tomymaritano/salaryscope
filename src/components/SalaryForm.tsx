'use client';

import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { roles, stacks } from '@/lib/data/rolesAndStacks';
import { countries } from '@/lib/data/countries';
import { currencies } from '@/lib/data/currencies';

type FormData = {
  country: string;
  role: string;
  stack: string[];
  contract: string;
  seniority: string;
  amount: number;
  currency: string;
};

// Data
const countryOptions = countries.map(c => ({ label: c.name, value: c.code }));
const roleOptions = roles.flatMap(r => r.options.map(o => o.label));
const stackOptions = stacks;
const currencyOptions = currencies.map(c => ({
  label: `${c.code} – ${c.name}`,
  value: c.code,
}));

// Util
function normalizeTag(text: string) {
  return text.trim().replace(/\s+/g, ' ');
}

export default function SalaryForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  const [status, setStatus] = useState('');
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState('');
  const [stackSuggestions, setStackSuggestions] = useState<typeof stackOptions>([]);
  const [stackActiveIdx, setStackActiveIdx] = useState(-1);

  const [roleInput, setRoleInput] = useState('');
  const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [roleActiveIdx, setRoleActiveIdx] = useState(-1);

  const stackInputRef = useRef<HTMLInputElement>(null);
  const inputRoleRef = useRef<HTMLInputElement>(null);

  // --- Stack logic: autocomplete, key nav, add/create tag ---
  useEffect(() => {
    if (!stackInput) {
      setStackSuggestions([]);
      setStackActiveIdx(-1);
      return;
    }
    const filtered = stackOptions.filter(
      s =>
        s.label.toLowerCase().includes(stackInput.toLowerCase()) &&
        !selectedStacks.includes(s.value)
    );
    setStackSuggestions(filtered);
    setStackActiveIdx(filtered.length > 0 ? 0 : -1);
  }, [stackInput, selectedStacks]);

  const handleStackInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si hay sugerencias, navega con flechas y Enter
    if (stackSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setStackActiveIdx(i => Math.min(i + 1, stackSuggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setStackActiveIdx(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = stackSuggestions[stackActiveIdx];
        if (selected) {
          addStack(selected.value);
          setStackInput('');
        }
      } else if (e.key === 'Tab') {
        // autocompleta el primero
        if (stackSuggestions[stackActiveIdx]) {
          addStack(stackSuggestions[stackActiveIdx].value);
          setStackInput('');
          e.preventDefault();
        }
      } else if (e.key === 'Escape') {
        setStackSuggestions([]);
        setStackInput('');
      }
    } else if (e.key === 'Enter' && stackInput.trim().length > 0) {
      // Permite crear una tecnología si no existe (como tag nueva)
      const normalized = normalizeTag(stackInput);
      const exists = stackOptions.find(
        s => s.label.toLowerCase() === normalized.toLowerCase()
      );
      if (exists && !selectedStacks.includes(exists.value)) {
        addStack(exists.value);
      } else if (!selectedStacks.includes(normalized) && normalized.length > 1) {
        addStack(normalized);
      }
      setStackInput('');
      e.preventDefault();
    }
  };

  function addStack(val: string) {
    // No repetir, ni strings vacíos
    if (!val.trim() || selectedStacks.includes(val)) return;
    setSelectedStacks(prev => [...prev, val]);
  }
  function removeStack(val: string) {
    setSelectedStacks(prev => prev.filter(s => s !== val));
  }

  // --- Rol logic: autocomplete, key nav ---
  useEffect(() => {
    if (!roleInput) {
      setRoleSuggestions([]);
      setShowRoleSuggestions(false);
      setRoleActiveIdx(-1);
      return;
    }
    const filtered = roleOptions.filter(role =>
      role.toLowerCase().includes(roleInput.toLowerCase())
    );
    setRoleSuggestions(filtered);
    setShowRoleSuggestions(filtered.length > 0);
    setRoleActiveIdx(filtered.length > 0 ? 0 : -1);
  }, [roleInput]);

  const handleRoleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRoleSuggestions || roleSuggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setRoleActiveIdx(idx => Math.min(idx + 1, roleSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setRoleActiveIdx(idx => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter' && roleActiveIdx >= 0) {
      setRoleInput(roleSuggestions[roleActiveIdx]);
      setValue('role', roleSuggestions[roleActiveIdx]);
      setShowRoleSuggestions(false);
      setRoleActiveIdx(-1);
      inputRoleRef.current?.blur();
    } else if (e.key === 'Escape') {
      setShowRoleSuggestions(false);
    }
  };

  // --- UX: scroll error ---
  const scrollToError = () => {
    const errKey = Object.keys(errors)[0];
    if (errKey) {
      const el = document.getElementById(errKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // --- Submit ---
  const onSubmit = async (data: FormData) => {
    // stacks pueden ser string[] (si el user agregó custom tag)
    const cleanStacks = selectedStacks
      .map(tag => {
        const match = stackOptions.find(s => s.value === tag);
        return match ? match.value : tag;
      })
      .filter(Boolean);

    const res = await fetch('/api/salary', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        role: roleInput,
        stack: cleanStacks,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    setStatus(res.ok ? 'success' : 'error');
    if (res.ok) {
      reset();
      setRoleInput('');
      setSelectedStacks([]);
      setStackInput('');
    }
    setTimeout(() => setStatus(''), 3200);
    if (!res.ok) scrollToError();
  };

  // --- Main form ---
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto space-y-8 rounded-xl p-8 backdrop-blur-xl bg-[#19191c]/80 border border-[#232326] transition"
      autoComplete="off"
      noValidate
      aria-labelledby="salary-form-title"
    >
      <FormFeedback status={status} />
      <h2 id="salary-form-title" className="sr-only">Formulario de salario</h2>

      {/* País */}
      <Field label="País" htmlFor="country" error={errors.country}>
        <select
          {...register('country', { required: true })}
          className={`field-input ${errors.country ? 'border-red-400 focus:ring-red-400' : ''}`}
          id="country"
        >
          <option value="">Seleccionar</option>
          {countryOptions.map(option =>
            <option key={option.value} value={option.value}>{option.label}</option>
          )}
        </select>
      </Field>

      {/* Rol */}
      <Field label="Rol" htmlFor="role" error={errors.role}>
        <div className="relative">
          <input
            {...register('role', { required: true })}
            value={roleInput}
            ref={inputRoleRef}
            onChange={e => {
              setRoleInput(e.target.value);
              setValue('role', e.target.value);
            }}
            onKeyDown={handleRoleKeyDown}
            onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 100)}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="role-suggestions"
            aria-activedescendant={roleActiveIdx >= 0 ? `role-sug-${roleActiveIdx}` : undefined}
            className={`field-input ${errors.role ? 'border-red-400 focus:ring-red-400' : ''}`}
            id="role"
            placeholder="Ej: Frontend Developer"
          />
          {showRoleSuggestions && roleSuggestions.length > 0 && (
            <ul
              id="role-suggestions"
              className="absolute z-30 left-0 right-0 bg-[#232326] border border-[#303033] mt-2 rounded-xl shadow-xl max-h-48 overflow-auto transition-all"
              role="listbox"
            >
              {roleSuggestions.map((role, idx) => (
                <li
                  key={role}
                  id={`role-sug-${idx}`}
                  className={`px-4 py-2 cursor-pointer transition-all hover:bg-[#18181b] rounded ${
                    roleActiveIdx === idx ? 'bg-[#262628]' : ''
                  }`}
                  onMouseDown={() => {
                    setRoleInput(role);
                    setValue('role', role);
                    setShowRoleSuggestions(false);
                    setRoleActiveIdx(-1);
                  }}
                  role="option"
                  aria-selected={roleActiveIdx === idx}
                  tabIndex={-1}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>

      {/* Stack tecnológico - autocomplete tags */}
      <Field label="Stack tecnológico">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedStacks.map(stackVal => {
            const stackObj = stackOptions.find(s => s.value === stackVal);
            return (
              <span
                key={stackVal}
                className="flex items-center gap-1 bg-[#18181b] text-teal-200 px-3 py-1 rounded-full text-xs border border-teal-800"
              >
                {stackObj ? stackObj.label : stackVal}
                <button
                  type="button"
                  className="ml-1 text-gray-500 hover:text-red-400 transition"
                  onClick={() => removeStack(stackVal)}
                  aria-label={`Eliminar ${stackObj ? stackObj.label : stackVal}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
        <div className="relative w-full">
          <input
            ref={stackInputRef}
            type="text"
            value={stackInput}
            onChange={e => setStackInput(e.target.value)}
            onKeyDown={handleStackInputKeyDown}
            placeholder="Escribí para buscar/agregar tecnología…"
            className="field-input !bg-[#18181b] !text-teal-200 placeholder:text-gray-500"
            aria-label="Agregar tecnología"
            aria-autocomplete="list"
            aria-controls="stack-suggestions"
            aria-activedescendant={stackActiveIdx >= 0 ? `stack-sug-${stackActiveIdx}` : undefined}
          />
          {stackInput && stackSuggestions.length > 0 && (
            <ul
              id="stack-suggestions"
              className="absolute left-0 right-0 mt-2 bg-[#232326] border border-[#303033] rounded-xl shadow-xl z-10 max-h-48 overflow-auto"
              role="listbox"
            >
              {stackSuggestions.map((s, idx) => (
                <li
                  key={s.value}
                  id={`stack-sug-${idx}`}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#18181b] text-teal-200 rounded ${
                    stackActiveIdx === idx ? 'bg-[#262628]' : ''
                  }`}
                  onMouseDown={() => {
                    addStack(s.value);
                    setStackInput('');
                  }}
                  role="option"
                  aria-selected={stackActiveIdx === idx}
                  tabIndex={-1}
                >
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1 block">Podés escribir una tecnología que no esté en la lista.</span>
      </Field>

      {/* Contrato */}
      <Field label="Tipo de contrato" htmlFor="contract" error={errors.contract}>
        <select
          {...register('contract', { required: true })}
          className={`field-input ${errors.contract ? 'border-red-400 focus:ring-red-400' : ''}`}
          id="contract"
        >
          <option value="">Seleccionar</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
          <option value="Contractor">Contractor</option>
        </select>
      </Field>

      {/* Seniority */}
      <Field label="Seniority" htmlFor="seniority" error={errors.seniority}>
        <select
          {...register('seniority', { required: true })}
          className={`field-input ${errors.seniority ? 'border-red-400 focus:ring-red-400' : ''}`}
          id="seniority"
        >
          <option value="">Seleccionar</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
        </select>
      </Field>

      {/* Monto y Moneda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Field label="Monto mensual" htmlFor="amount" error={errors.amount} className="flex-1">
          <input
            type="number"
            {...register('amount', { required: true, valueAsNumber: true, min: 1 })}
            placeholder="Ej: 2000"
            className={`field-input ${errors.amount ? 'border-red-400 focus:ring-red-400' : ''}`}
            id="amount"
            min={1}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </Field>
        <Field label="Moneda" htmlFor="currency" error={errors.currency} className="w-full sm:w-40">
          <select
            {...register('currency', { required: true })}
            className={`field-input ${errors.currency ? 'border-red-400 focus:ring-red-400' : ''}`}
            id="currency"
          >
            <option value="">Seleccionar</option>
            {currencyOptions.map(option =>
              <option key={option.value} value={option.value}>{option.label}</option>
            )}
          </select>
        </Field>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-[#232326] hover:bg-[#18181b] text-teal-200 font-bold rounded-xl text-base shadow focus:ring-2 focus:ring-teal-400 focus:outline-none disabled:opacity-60 transition"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar salario'}
      </button>
    </form>
  );
}

// --- Animación feedback envío ---
function FormFeedback({ status }: { status: string }) {
  if (!status) return null;
  return (
    <div
      className={`mb-2 text-center rounded px-4 py-2 font-semibold shadow animate-in fade-in transition-all border
        ${status === "success"
          ? "bg-[#1d2d25] border-teal-700 text-teal-300"
          : "bg-[#2d191a] border-red-700 text-red-400"}`}
    >
      {status === "success"
        ? <>✅ Salario enviado. ¡Gracias por tu aporte!</>
        : <>❌ Hubo un error al enviar. Revisá los datos.</>
      }
    </div>
  );
}

// --- Field pro, tipado ---
interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: unknown;
  className?: string;
  children: React.ReactNode;
}
function Field({ label, htmlFor, error, className = "", children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`text-xs font-bold mb-1 tracking-wide transition
          ${error ? "text-red-500" : "text-gray-400"}
        `}
      >
        {label}
      </label>
      {children}
      {!!error && (
        <span className="text-red-500 text-xs mt-1 animate-in fade-in">
          Campo requerido.
        </span>
      )}
    </div>
  );
}

/*
Agregá esto en tu TailwindCSS:

.field-input {
  @apply w-full bg-[#18181b]/90 border border-[#232326] rounded-xl px-4 py-2 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm backdrop-blur transition;
}
*/