'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from '../components/form/formAtoms';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { info } from '../../info';
import fbEvent from '../services/fbEvents';
import { restrictNumber } from '../utils/formValidators';

const formSteps = [
  {
    name: 'title',
    title: `Compártenos un poco más sobre tu empresa para perfilarte mejor`,
    description: '¿Qué puesto desempeñas en la empresa?',
    type: 'radio',
    options: [
      {value: 'director', label: 'Dirección General'},
      {value: 'administracion', label: 'Administración'},
      {value: 'recursos-humanos', label: 'Gerencia Recursos Humanos'},
      {value: 'producción', label: 'Gerencia Producción'},
      {value: 'otro', label: 'Otro'},
    ],
    cols: 1,
    inputOptions: {required: true}
  },
  {
    name: 'companySize',
    title: '¿Con cuántos colaboradores cuenta la empresa?',
    description: 'Selecciona una opción por favor',
    type: 'radio',
    options: [
      {value: '<10', label: 'Menos de 10'},
      {value: '10-50', label: 'De 10 a 50'},
      {value: '50-100', label: 'De 50 a 100'},
      {value: '100+', label: 'Más de 100'},
    ],
    cols: 1,
    inputOptions: {required: true}
  },
  {
    name: 'area',
    title: '¿En qué área te interesa certificarte?',
    type: 'radio',
    options: [
      {value: 'calidad', label: 'Calidad'},
      {value: 'inocuidad', label: 'Inocuidad'},
      {value: 'medio-ambiente', label: 'Medio ambiente'},
      {value: 'seguridad-salud', label: 'Seguridad y Salud ocupacional'},
      {value: 'ti', label: 'Tecnologías de la información'},
    ],
    cols: 1,
    inputOptions: {required: true}
  },
  // {
  //   name: 'commitment',
  //   title: 'Estás a punto de programar una sesión con nosotros ¿contamos con tu asistencia puntual?',
  //   description: 'Dado al volumen de solicitudes que tenemos, en ocasiones es complicado reprogramar.',
  //   type: 'radio',
  //   options: [
  //     {value: 'si', label: 'Claro que sí!'},
  //     {value: 'recordar', label: 'Recuérdenme por favor'},
  //     {value: 'no', label: 'No sé'},
  //   ],
  //   cols: 3,
  //   inputOptions: {required: true}
  // },
];

export default function Survey() {
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
    watch
  } = methods;

  const router = useRouter();

  useEffect(() => {
    formSteps.map((fs) => setError(fs.name, {}));
  }, [setError]);

  const handleNext = () => {
    const formStepName = formSteps[formStep].name;
    if (errors[formStepName]) {
      setInputError(formStep);
      return;
    }
    setInputError(null);
    window.scrollTo(0, 0);
    return formStep < formSteps.length - 1 && setFormStep(formStep + 1);
  };

  const onSubmit = (data) => {
    setSending(true);
    const lead = getCookie('lead');
    const {id, email, phone, fullName} = JSON.parse(lead);
    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');

    const payload = {...data, id, fullName, email, phone, _fbc, _fbp};
    console.log('payload',payload);

    fetch(info.surveyWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response)
      // .then(() => fbEvent(
      //   'Lead',
      //   {email, phone, externalID: id},
      // ))
      // Redirect to Thank you page and Scheduler
      .then(() => {
        if (info.surveyRedirect !== '') {
          const forwardLink = document.createElement('a');
          forwardLink.href = info.surveyRedirect + `?name=${fullName}&email=${email}&phone${phone}`;
          forwardLink.target = '_blank';
          forwardLink.click();
        }

        router.push(`/thankyou`);
      });
  };

  return (
    <div className="relative flex flex-grow bg-black pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
          </div>
          <p className="-ft-1">{formStep + 1}/{formSteps.length}</p>
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {formSteps.map((fs, idx) => {
                if (fs.type === 'text') {
                  const {name, title, description, placeholder, inputOptions} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 flex-grow ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-4 sans font-bold" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="ft-2 mt-4 mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <input
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }
                if (fs.type === 'number') {
                  const {name, title, description, placeholder, inputOptions} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 flex-grow ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-4 sans font-bold" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="ft-2 mt-4 mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <input
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        onKeyDown={restrictNumber}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }

                if (fs.type === 'radio') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-4 sans font-bold" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="ft-2 mt-4 mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Radio
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'checkbox') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-4 sans font-bold" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="ft-2 mt-4 mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Checkbox
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'textarea') {
                  const {name, title, description, placeholder, inputOptions, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-4 sans font-bold" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="ft-2 mt-4 mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <textarea
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        rows={cols}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }
              })}

              <div className="flex justify-between w-full mt-auto">
                <button
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="!bg-transparent !text-brand-3 border-none hover:text-brand-1 disabled:!text-gray-100"
                  disabled={formStep <= 0}
                >Atrás
                </button>
                <button
                  type={formStep < formStep.length - 1 ? 'button' : 'submit'}
                  disabled={sending}
                  onClick={() => handleNext()}
                  className="mt-auto"
                >
                  {sending && <span className="animate-spin mr-4">+</span>}
                  {formStep === formSteps.length - 1 ? 'Agendar cita' : sending ? 'Abriendo Calendario' : 'Siguiente'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const {req, res, query: {id}} = ctx;
  const lead = getCookie('lead', {req, res});

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    if (!id) {
      return {
        redirect: {
          permanent: false,
          destination: '/#contact',
        },
      };
    } else {
      setCookie('lead', {...lead, id}, {req, res});
      return {props: {}};
    }
  }

  return {props: {}}
}
