import Link from 'next/link';
import { info } from '../../../info';
import Logo from '../ui/logo';
import LanguageToggle from '../ui/languageToggle';
import { useT } from '../../i18n/ui';

export default function Header() {
  const t = useT();

  return (
    <header
      className={`fixed w-full bg-white/80 border-b border-solid border-[#eee] top-0 backdrop-blur-lg h-[5rem] md:h-[8rem] flex justify-center z-[20] hover:top-0`}
    >
      <div className="flex justify-between w-full items-center z-[1] px-8 py-4">
        <div className="relative flex items-center h-[3rem] md:h-[5rem] w-[24rem]">
          <Link href="/" passHref>
            <a aria-label={info.companyName} className="flex h-full">
              <Logo className="h-full text-cyan-700" aria-label={info.companyName} />
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          {/*<a*/}
          {/*  href="#reserva"*/}
          {/*  rel="noreferrer"*/}
          {/*  className="flex bg-brand-5 rounded-md shadow-xl h-[3rem] px-8 items-center -ft-1 text-white font-medium"*/}
          {/*>*/}
          {/*  {t('nav.book')}*/}
          {/*</a>*/}
        </div>
      </div>
    </header>
  );
}
