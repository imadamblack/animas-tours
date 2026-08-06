import { info } from '../../info';
import { useT } from '../i18n/ui';

export default function ThankYou() {
  const t = useT();
  const whatsappUrl = `https://wa.me/${info.whatsapp.value}?text=${encodeURIComponent(info.whatsapp.message)}`;

  return (
    <section className="relative flex flex-col flex-grow justify-center pt-20 px-0">
      <div className="container md:w-1/2 flex flex-col items-center gap-8">
        <h1 className="ft-8 text-center">
          {t('thanks.title')}
        </h1>
        <p className="text-center">
          {t('thanks.body', {company: info.companyName})}
        </p>
        <div className="flex flex-col items-center justify-center gap-10">
          <a
            className="ft-2 py-3 px-6 rounded-lg items-center"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-green-600">
              {t('thanks.whatsappPre')}{' '}
              <span className="font-semibold">{t('thanks.whatsapp')}</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
