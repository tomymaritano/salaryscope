'use client';

import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { roles, stacks } from '@/lib/data/rolesAndStacks';
import { countries } from '@/lib/data/countries';
import { currencies } from '@/lib/data/currencies';
import StackPickerModal from './StackPickerModal';
import { StackChips } from './StackChips';

type FormData = {
  country: string;
  role: string;
  stack: string[];
  contract: string;
  seniority: string;
  amount: number;
  currency: string;
};

const countryOptions = countries.map(c => ({ label: c.name, value: c.code }));
const roleOptions = roles.flatMap(r => r.options.map(o => o.label));
const stackOptions = stacks;
const currencyOptions = currencies.map(c => ({
  label: `${c.code} – ${c.name}`,
  value: c.code,
}));

export default function SalaryForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<FormData>();
  const [status, setStatus] = useState('');
  const [showStackModal, setShowStackModal] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState('');
  const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(-1);
  const inputRoleRef = useRef<HTMLInputElement>(null);

  const selectedStackObjs = stackOptions.filter(s => selectedStacks.includes(s.value));

  // UX: Scroll to error input
  const scrollToError = () => {
    const errKey = Object.keys(errors)[0];
    if (errKey) {
      const el = document.getElementById(errKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/salary', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        role: roleInput,
        stack: selectedStacks,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    setStatus(res.ok ? 'success' : 'error');
    if (res.ok) {
      reset();
      setRoleInput('');
      setSelectedStacks([]);
    }
    setTimeout(() => setStatus(''), 3500);
    if (!res.ok) scrollToError();
  };

  // Stack management
  const handleAddStack = (val: string) => {
    if (!selectedStacks.includes(val)) setSelectedStacks(prev => [...prev, val]);
  };
  const handleRemoveStack = (val: string) => {
    setSelectedStacks(prev => prev.filter(s => s !== val));
  };

  // Autocomplete logic para rol
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoleInput(value);
    setValue('role', value);
    if (value.length > 0) {
      const filtered = roleOptions.filter(role =>
        role.toLowerCase().includes(value.toLowerCase())
      );
      setRoleSuggestions(filtered);
      setShowRoleSuggestions(true);
    } else {
      setShowRoleSuggestions(false);
      setRoleSuggestions([]);
    }
    setSelectedRoleIndex(-1);
  };

  const handleRoleSuggestionClick = (role: string) => {
    setRoleInput(role);
    setValue('role', role);
    setShowRoleSuggestions(false);
    setSelectedRoleIndex(-1);
    inputRoleRef.current?.blur();
  };

  const handleRoleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRoleSuggestions || roleSuggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setSelectedRoleIndex(prev => Math.min(prev + 1, roleSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedRoleIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedRoleIndex >= 0) {
      setRoleInput(roleSuggestions[selectedRoleIndex]);
      setValue('role', roleSuggestions[selectedRoleIndex]);
      setShowRoleSuggestions(false);
      setSelectedRoleIndex(-1);
      inputRoleRef.current?.blur();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto space-y-7"
      autoComplete="off"
      noValidate
    >
      {/* Feedback banner */}
      {status === "success" && (
        <div className="mb-2 text-center rounded-lg bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 font-medium shadow transition-all animate-in fade-in">
          ✅ Salario enviado. ¡Gracias por tu aporte!
        </div>
      )}
      {status === "error" && (
        <div className="mb-2 text-center rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-2 font-medium shadow transition-all animate-in fade-in">
          ❌ Hubo un error al enviar. Por favor revisá los datos.
        </div>
      )}

      {/* País */}
      <Field label="País" htmlFor="country" error={errors.country}>
        <select
          {...register('country', { required: true })}
          className="field-input"
          id="country"
        >
          <option value="">Seleccionar</option>
          {countryOptions.map(option =>
            <option key={option.value} value={option.value}>{option.label}</option>
          )}
        </select>
      </Field>
      {/* Rol Autocomplete */}
      <Field label="Rol" htmlFor="role" error={errors.role}>
        <div className="relative">
          <input
            {...register('role', { required: true })}
            value={roleInput}
            ref={inputRoleRef}
            onChange={handleRoleChange}
            onKeyDown={handleRoleKeyDown}
            onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 100)}
            autoComplete="off"
            className="field-input"
            id="role"
            placeholder="Ej: Frontend Developer"
          />
          {showRoleSuggestions && roleSuggestions.length > 0 && (
            <ul className="absolute z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-1 w-full rounded-xl shadow max-h-44 overflow-auto animate-in fade-in">
              {roleSuggestions.map((role, idx) => (
                <li
                  key={role}
                  className={`px-3 py-2 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900 rounded ${selectedRoleIndex === idx ? 'bg-teal-100 dark:bg-teal-800' : ''}`}
                  onMouseDown={() => handleRoleSuggestionClick(role)}
                  tabIndex={-1}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>
      {/* Stack */}
      <Field label="Stack tecnológico">
        <button
          type="button"
          className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold mb-2 shadow"
          onClick={() => setShowStackModal(true)}
        >
          + Seleccionar tecnologías
        </button>
        <StackChips
          stacks={selectedStackObjs}
          onRemove={handleRemoveStack}
        />
        {showStackModal && (
          <StackPickerModal
            stacks={stackOptions}
            selected={selectedStacks}
            onSelect={handleAddStack}
            onRemove={handleRemoveStack}
            onClose={() => setShowStackModal(false)}
          />
        )}
      </Field>
      {/* Contrato */}
      <Field label="Tipo de contrato" htmlFor="contract" error={errors.contract}>
        <select
          {...register('contract', { required: true })}
          className="field-input"
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
          className="field-input"
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
            {...register('amount', { required: true, valueAsNumber: true })}
            placeholder="Ej: 2000"
            className="field-input"
            id="amount"
          />
        </Field>
        <Field label="Moneda" htmlFor="currency" error={errors.currency} className="w-full sm:w-40">
          <select
            {...register('currency', { required: true })}
            className="field-input"
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
        className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-base shadow transition-all disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar salario'}
      </button>
    </form>
  );
}

// Field wrapper pro, tipado, sin any
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
        className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
      >
        {label}
      </label>
      {children}
      {!!error && (
        <span className="text-red-500 text-xs mt-1">
          Campo requerido.
        </span>
      )}
    </div>
  );
}

/* 
Agregá en tu TailwindCSS:
.field-input {
  @apply w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition;
}
*/