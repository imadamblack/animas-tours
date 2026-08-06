const mapa = ({ lugar, ciudad, estado, pais, comentario, UrlMap }) => {
  return (
    <div className='w-full flex flex-col'>
      <p className="ft-2 font-semibold">{`${lugar}, ${ciudad}`}</p>
      <p className="-ft-1 pb-8 flex-grow">{comentario}</p>
      <div className="h-[500px] md:w-[100%] overflow-hidden rounded-3xl">
        <iframe
          src={UrlMap}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default mapa;
