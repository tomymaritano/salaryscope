#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug() {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky > $1"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi
  if [ -f ~/.huskyrc ]; then
    debug "found ~/.huskyrc"
    . ~/.huskyrc
  fi
  export husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"
  debug "exiting $hook_name (exit $exitCode)"
  exit $exitCode
fi
