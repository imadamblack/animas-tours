import { info } from '../../../info';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';
import { DatePicker, Select, toISODate } from './formAtoms';
import { tours } from '../../../DataAtlas';

export default function OptInForm({tour = '', price = '', lastClick = '', onTourChange}) {
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowForInput = toISODate(tomorrow);
  const todayForInput = toISODate(new Date());

  /* Máximo reservable: 1 mes hacia adelante (con día recortado al largo del mes) */
  const maxDateForInput = (() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(now.getDate(), lastDay));
    return toISODate(target);
  })();

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      tourDate: tomorrowForInput,
    },
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = methods;

  const onSubmit = (data) => {
    setSending(true);
    data.cleanPhone = '52' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');
    data.origin = 'Notoriovs Landing';
    data.tour = tour;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const utmCookie = getCookie('lead_utm') || '{}';
    const utm = JSON.parse(utmCookie);
    const payload = {...data, _fbc, _fbp, ...utm};

    // Sin redirección externa: se captura el lead y se manda a /thankyou.
    const finish = (id = '') => {
      fbEvent('Lead', {email: data.email, phone: data.phone, externalID: id});
      setCookie('lead', {...data, id});
      router.push('/thankyou');
    };

    fetch(info.optInWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'},
    })
      .then((result) => result.json())
      .then(({id}) => finish(id))
      .catch(() => finish());
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <p className="-ft-1 uppercase font-medium">Fecha</p>
            <DatePicker
              name="tourDate"
              inputOptions={{required: true}}
              min={todayForInput}
              max={maxDateForInput}
              format="medium"
              clearable={false}
              placeholder="Fecha del tour"/>
          </div>
          <div className="w-full">
            <p className="-ft-1 uppercase font-medium">Personas</p>
            <input
              {...register('pax', {required: true})}
              type="number"
              min="1"
              className={errors.pax && '!bg-red-200'}
              onKeyDown={restrictNumber}
              placeholder="Personas"/>
          </div>
        </div>

        <input
          {...register('fullName', {required: true})}
          className={errors.fullName && '!bg-red-200'}
          placeholder="Tu nombre"/>

        <input
          {...register('phone', {required: true, maxLength: 10, minLength: 10})}
          className={errors.phone && '!bg-red-200'}
          onKeyDown={restrictNumber}
          placeholder="Teléfono de WhatsApp"/>

        {/*<input*/}
        {/*  {...register('email', {required: true})}*/}
        {/*  type="email"*/}
        {/*  className={errors.email && '!bg-red-200'}*/}
        {/*  placeholder="Correo electrónico"/>*/}

        {/*<Select*/}
        {/*  name="tour"*/}
        {/*  inputOptions={{required: true}}*/}
        {/*  placeholder="¿Qué tour te interesa?"*/}
        {/*  value={tour}*/}
        {/*  onChange={(newTour) => onTourChange && onTourChange(newTour)}*/}
        {/*  options={tours.map(({slug, name}) => ({value: slug, name}))}*/}
        {/*/>*/}

        <button
          disabled={sending}
          className={`w-full ${sending ? '!bg-transparent' : 'hover:!bg-brand-3'}`}
        >{
          !sending
            ? 'Reservar →'
            : <span className="material-symbols-outlined text-brand-5 animate-spin">progress_activity</span>
        }</button>

        <div className="mt-4">
          <p className="-ft-2 text-center">Aún no se te cobrará nada</p>
        </div>
      </form>
    </FormProvider>
  );
}
