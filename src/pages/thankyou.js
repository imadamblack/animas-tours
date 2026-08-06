import { info } from '../../info';

export default function ThankYou() {
  const whatsappUrl = `https://wa.me/${info.whatsapp.value}?text=${encodeURIComponent(info.whatsapp.message)}`;

  return (
    <section className="relative flex flex-col flex-grow justify-center pt-20 px-0">
      <div className="container md:w-1/2 flex flex-col items-center gap-8">
        <h1 className="ft-8 text-center">
          Listo, recibimos tu solicitud
        </h1>
        <p className="text-center">
          {`Un miembro del equipo de ${info.companyName} te contactará por WhatsApp para confirmar disponibilidad y cerrar tu reservación.`}
        </p>
        <div className="flex flex-col items-center justify-center gap-10">
          <a
            className="ft-2 py-3 px-6 rounded-lg items-center"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-green-600">
              ¿Tienes prisa? Escríbenos por <span className="font-semibold">WhatsApp</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
