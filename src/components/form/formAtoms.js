import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocale, useT } from '../../i18n/ui';

export const Select = ({name, inputOptions, options, placeholder, className = '', value = '', onChange}) => {
  const {register} = useFormContext();

  return (
    <div className="select">
      <select
        {...register(name, inputOptions)}
        className={className + 'rounded-lg'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled selected>{placeholder}</option>
        {/* eslint-disable-next-line react/jsx-key */}
        {options.map((opt) => <option value={opt.value}>{opt.name}</option>)}
      </select>
    </div>
  );
};

export const Radio = ({name, inputOptions, options, optCols = 3, className = ''}) => {
  const {register} = useFormContext();

  return (
    <div className="radio">
      <fieldset
        className={`w-full grid grid-cols-3 gap-4`}
        style={{gridTemplateColumns: `repeat(${optCols}, minmax(0, 1fr))`}}
      >
        {options.map((opt) => (
          <>
            <div className="flex items-stretch">
              <input
                {...register(name, inputOptions)}
                type="radio" id={opt.value} name={name} value={opt.value} />
              <label htmlFor={opt.value} className={className}>{opt.label}</label>
            </div>
          </>
        ))}
      </fieldset>
    </div>
  );
};

/* ============================================================
   DatePicker — calendario accesible (WAI-ARIA date grid)
   Fecha única · bilingüe (es-MX / en-US) · valor yyyy-mm-dd
   ============================================================ */

/* Locale de Intl que corresponde a cada idioma del sitio. */
const INTL_LOCALE = {es: 'es-MX', en: 'en-US'};

/* --- Helpers de fecha: SIEMPRE en enteros de fecha local --- */
/* Nunca usar new Date('2026-06-04') / Date.parse: eso se interpreta
   como medianoche UTC y recorre el día en husos negativos (México). */

const pad = (n) => String(n).padStart(2, '0');

export const toISODate = (date) =>
  date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : '';

export const fromISODate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value) ? null : startOfDay(value);
  const [y, m, d] = String(value).split('-').map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return isNaN(date) ? null : date;
};

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const sameDay = (a, b) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);

const addMonths = (date, n) => {
  const target = new Date(date.getFullYear(), date.getMonth() + n, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return target;
};

const clampDate = (date, min, max) => {
  if (min && date < min) return min;
  if (max && date > max) return max;
  return date;
};

/* Lunes primero: cuántos huecos van antes del día 1 */
const leadingBlanks = (firstOfMonth) => (firstOfMonth.getDay() + 6) % 7;

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

/* Iniciales de los días, lunes primero, generadas desde Intl para que cambien
   con el idioma: Lu Ma Mi Ju Vi Sá Do / Mo Tu We Th Fr Sa Su */
const buildWeekdays = (intlLocale) => {
  const fmt = new Intl.DateTimeFormat(intlLocale, {weekday: 'short'});
  // 1 de enero de 2024 cayó en lunes: sirve de ancla para recorrer la semana.
  return Array.from({length: 7}, (_, i) =>
    capitalize(fmt.format(new Date(2024, 0, 1 + i)).replace('.', '').slice(0, 2)),
  );
};

/* Los objetos de Intl son caros de construir: se crean una vez por idioma. */
const formattersCache = {};

const getDateFormatters = (locale) => {
  if (formattersCache[locale]) return formattersCache[locale];

  const intlLocale = INTL_LOCALE[locale] || INTL_LOCALE.es;

  formattersCache[locale] = {
    weekdays: buildWeekdays(intlLocale),
    monthTitle: new Intl.DateTimeFormat(intlLocale, {month: 'long', year: 'numeric'}),
    dayLabel: new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }),
    valueLong: new Intl.DateTimeFormat(intlLocale, {day: 'numeric', month: 'long', year: 'numeric'}),
    valueMedium: new Intl.DateTimeFormat(intlLocale, {day: 'numeric', month: 'short', year: 'numeric'}),
    valueShort: new Intl.DateTimeFormat(intlLocale, {day: '2-digit', month: '2-digit', year: 'numeric'}),
    valueFull: new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }),
  };

  return formattersCache[locale];
};

const Icon = ({name, className = ''}) => (
  <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{name}</span>
);

/**
 * DatePicker accesible de fecha única.
 *
 * @param {string}   name          Nombre del campo (react-hook-form o submit nativo).
 * @param {object}   inputOptions  Reglas de validación de react-hook-form.
 * @param {Date|string} min        Fecha mínima seleccionable (Date o 'yyyy-mm-dd').
 * @param {Date|string} max        Fecha máxima seleccionable.
 * @param {function} disabledDates Predicado (date) => boolean para deshabilitar días.
 * @param {string}   placeholder   Texto cuando no hay valor. Por defecto, el del idioma activo.
 * @param {string}   format        'long' | 'short' | 'full' — cómo se muestra la fecha.
 * @param {string}   value         Valor controlado ('yyyy-mm-dd') si no usas react-hook-form.
 * @param {function} onChange      Callback con el valor ISO ('yyyy-mm-dd' | '').
 * @param {boolean}  clearable     Muestra el botón × para limpiar. Default true.
 */
export const DatePicker = ({
  name = 'date',
  inputOptions,
  min,
  max,
  disabledDates,
  placeholder,
  format = 'long',
  className = '',
  value,
  onChange,
  clearable = true,
  id,
}) => {
  const form = useFormContext();
  const isRHF = !!form && typeof form.register === 'function';

  /* Idioma activo: define los nombres de meses y días y los textos del calendario. */
  const locale = useLocale();
  const t = useT();
  const fmt = getDateFormatters(locale);
  const emptyLabel = placeholder || t('date.placeholder');

  const reactId = useId();
  const baseId = id || `dp-${String(reactId).replace(/[:]/g, '')}`;
  const popoverId = `${baseId}-popover`;
  const titleId = `${baseId}-title`;

  const rootRef = useRef(null);
  const fieldRef = useRef(null);
  const gridRef = useRef(null);
  const shouldFocusRef = useRef(false);

  const minDate = useMemo(() => fromISODate(min), [min]);
  const maxDate = useMemo(() => fromISODate(max), [max]);
  const today = useMemo(() => startOfDay(new Date()), []);

  /* --- Valor: react-hook-form si hay contexto, si no estado interno --- */
  const [innerValue, setInnerValue] = useState(value ?? '');
  const rhfValue = isRHF ? form.watch(name) : undefined;
  const isoValue = isRHF ? (rhfValue || '') : (value !== undefined ? value : innerValue);
  const selected = useMemo(() => fromISODate(isoValue), [isoValue]);

  const hasError = isRHF && !!form.formState?.errors?.[name];

  const [open, setOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState(
    () => clampDate(fromISODate(isoValue) || today, minDate, maxDate),
  );
  const [viewMonth, setViewMonth] = useState(
    () => clampDate(fromISODate(isoValue) || today, minDate, maxDate),
  );

  const isDisabledDay = useCallback((date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (typeof disabledDates === 'function' && disabledDates(date)) return true;
    return false;
  }, [minDate, maxDate, disabledDates]);

  const commit = useCallback((date) => {
    const iso = date ? toISODate(date) : '';
    if (isRHF) {
      form.setValue(name, iso, {shouldValidate: true, shouldDirty: true, shouldTouch: true});
    } else if (value === undefined) {
      setInnerValue(iso);
    }
    if (onChange) onChange(iso, date || null);
  }, [isRHF, form, name, value, onChange]);

  const openPopover = useCallback(() => {
    const anchor = clampDate(fromISODate(isoValue) || today, minDate, maxDate);
    setViewMonth(anchor);
    setFocusedDate(anchor);
    shouldFocusRef.current = true;
    setOpen(true);
  }, [isoValue, today, minDate, maxDate]);

  const closePopover = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus && fieldRef.current) fieldRef.current.focus();
  }, []);

  /* Cerrar al hacer click fuera (sin alterar la selección) */
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  /* Foco real en la celda activa (roving tabindex) */
  useEffect(() => {
    if (!open || !shouldFocusRef.current || !gridRef.current) return;
    const cell = gridRef.current.querySelector('[data-dp-active="true"]');
    if (cell) cell.focus();
    shouldFocusRef.current = false;
  }, [open, focusedDate, viewMonth]);

  const moveFocus = useCallback((nextDate) => {
    let candidate = clampDate(nextDate, minDate, maxDate);
    /* Saltar días deshabilitados por predicado, en la dirección del movimiento */
    if (typeof disabledDates === 'function') {
      const step = nextDate >= focusedDate ? 1 : -1;
      let guard = 0;
      while (isDisabledDay(candidate) && guard < 370) {
        const next = addDays(candidate, step);
        if ((minDate && next < minDate) || (maxDate && next > maxDate)) break;
        candidate = next;
        guard += 1;
      }
    }
    if (isDisabledDay(candidate)) return;
    shouldFocusRef.current = true;
    setFocusedDate(candidate);
    setViewMonth(candidate);
  }, [minDate, maxDate, disabledDates, isDisabledDay, focusedDate]);

  const selectDate = useCallback((date) => {
    if (isDisabledDay(date)) return;
    commit(date);
    setFocusedDate(date);
    closePopover(true);
  }, [isDisabledDay, commit, closePopover]);

  const onGridKeyDown = (event) => {
    const {key, shiftKey} = event;
    let next = null;

    if (key === 'ArrowLeft') next = addDays(focusedDate, -1);
    else if (key === 'ArrowRight') next = addDays(focusedDate, 1);
    else if (key === 'ArrowUp') next = addDays(focusedDate, -7);
    else if (key === 'ArrowDown') next = addDays(focusedDate, 7);
    else if (key === 'Home') next = addDays(focusedDate, -leadingBlanks(focusedDate));
    else if (key === 'End') next = addDays(focusedDate, 6 - leadingBlanks(focusedDate));
    else if (key === 'PageUp') next = addMonths(focusedDate, shiftKey ? -12 : -1);
    else if (key === 'PageDown') next = addMonths(focusedDate, shiftKey ? 12 : 1);
    else if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      selectDate(focusedDate);
      return;
    } else if (key === 'Escape') {
      event.preventDefault();
      closePopover(true);
      return;
    } else {
      return;
    }

    event.preventDefault();
    moveFocus(next);
  };

  /* --- Celdas del mes visible --- */
  const cells = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const blanks = leadingBlanks(first);
    const list = [];
    for (let i = 0; i < blanks; i += 1) list.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) {
      list.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    }
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [viewMonth]);

  const prevDisabled = useMemo(() => {
    const lastOfPrev = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0);
    return !!minDate && lastOfPrev < minDate;
  }, [viewMonth, minDate]);

  const nextDisabled = useMemo(() => {
    const firstOfNext = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
    return !!maxDate && firstOfNext > maxDate;
  }, [viewMonth, maxDate]);

  const goMonth = (delta) => {
    const next = addMonths(viewMonth, delta);
    setViewMonth(next);
    setFocusedDate(clampDate(next, minDate, maxDate));
  };

  const displayValue = useMemo(() => {
    if (!selected) return '';
    if (format === 'short') return fmt.valueShort.format(selected);
    if (format === 'medium') return fmt.valueMedium.format(selected).replace('.', '');
    if (format === 'full') return capitalize(fmt.valueFull.format(selected));
    return fmt.valueLong.format(selected);
  }, [selected, format, fmt]);

  /* Atajo del pie: hoy, o la fecha seleccionable más próxima si hoy está fuera de rango */
  const shortcutDate = useMemo(() => clampDate(today, minDate, maxDate), [today, minDate, maxDate]);
  const shortcutLabel = sameDay(shortcutDate, today) ? t('date.today') : t('date.soonest');

  return (
    <div ref={rootRef} className={`datepicker ${className}`}>
      {/* Valor real para react-hook-form / submit nativo (ISO yyyy-mm-dd) */}
      {isRHF
        ? <input type="hidden" {...form.register(name, inputOptions)} />
        : <input type="hidden" name={name} value={isoValue || ''} readOnly />}

      <button
        ref={fieldRef}
        type="button"
        id={baseId}
        onClick={() => (open ? closePopover() : openPopover())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            openPopover();
          }
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        className={[
          'dp-field',
          open ? 'is-open' : '',
          selected ? 'has-value' : '',
          hasError ? 'has-error' : '',
        ].filter(Boolean).join(' ')}
      >
        <Icon name="calendar_month" className="dp-icon" />
        <span className={selected ? 'dp-value' : 'dp-placeholder'}>
          {displayValue || emptyLabel}
        </span>
        {clearable && selected && (
          <span
            role="button"
            tabIndex={-1}
            aria-label={t('date.clearAria')}
            className="dp-clear"
            onClick={(e) => {
              e.stopPropagation();
              commit(null);
            }}
          >
            <Icon name="close" />
          </span>
        )}
      </button>

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={t('date.dialogAria')}
          className="dp-pop"
        >
          {/* Encabezado */}
          <div className="dp-head">
            <button type="button" className="dp-nav" onClick={() => goMonth(-1)}
              disabled={prevDisabled} aria-label={t('date.prevMonth')}>
              <Icon name="chevron_left" />
            </button>
            <div id={titleId} aria-live="polite" className="dp-title">
              {capitalize(fmt.monthTitle.format(viewMonth))}
            </div>
            <button type="button" className="dp-nav" onClick={() => goMonth(1)}
              disabled={nextDisabled} aria-label={t('date.nextMonth')}>
              <Icon name="chevron_right" />
            </button>
          </div>

          {/* Días de la semana (lunes primero) */}
          <div className="dp-week">
            {fmt.weekdays.map((day) => (
              <div key={day} className="dp-wd" aria-hidden="true">{day}</div>
            ))}
          </div>

          {/* Cuadrícula de días */}
          <div
            ref={gridRef}
            role="grid"
            aria-labelledby={titleId}
            onKeyDown={onGridKeyDown}
            className="dp-grid"
          >
            {cells.map((date, index) => {
              if (!date) return <div key={`blank-${index}`} role="presentation" />;

              const disabled = isDisabledDay(date);
              const isSelected = sameDay(date, selected);
              const isToday = sameDay(date, today);
              const isFocused = sameDay(date, focusedDate);

              return (
                <button
                  key={toISODate(date)}
                  type="button"
                  role="gridcell"
                  data-dp-active={isFocused ? 'true' : 'false'}
                  tabIndex={isFocused ? 0 : -1}
                  disabled={disabled}
                  aria-disabled={disabled || undefined}
                  aria-selected={isSelected}
                  aria-label={
                    `${capitalize(fmt.dayLabel.format(date))}` +
                    `${isToday ? ` (${t('date.today')})` : ''}` +
                    `${disabled ? ` (${t('date.unavailable')})` : ''}`
                  }
                  onClick={() => selectDate(date)}
                  className={[
                    'dp-day',
                    isSelected ? 'is-selected' : '',
                    isToday ? 'is-today' : '',
                    disabled ? 'is-disabled' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {date.getDate()}
                  {isToday && <span className="dp-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Pie */}
          <div className="dp-foot">
            <button
              type="button"
              className="dp-action"
              disabled={isDisabledDay(shortcutDate)}
              onClick={() => selectDate(shortcutDate)}
            >{shortcutLabel}</button>
            {clearable && (
              <button
                type="button"
                className="dp-action"
                onClick={() => {
                  commit(null);
                  closePopover(true);
                }}
              >{t('date.clear')}</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};