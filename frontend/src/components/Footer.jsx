function Footer() {
  return (
    <footer className="grid-layout bg-[var(--primary-color)] w-full max-w-none py-10">
      <div className="full-width-content place-items-center">
        <figure className="w-[200px] bg-gray-100 py-2 px-4 rounded-md mb-4">
          <img src="/logo-edited.png" alt="logo" />
        </figure>
        <div className="flex gap-2 mb-6">
          <a href="https://wa.me/27661331990" target="_blank" className="size-7"><img src="/icons/whatsapp.svg" alt="whatsapp icon" /></a>
          <a href="https://web.facebook.com/phahlamohlaka.raymond.thabiso" target="_blank" className="size-7"><img src="/icons/facebook.svg" alt="facebook icon" /></a>
        </div>
        <small className="text-white">Copyright &copy; 2025</small>
      </div>
    </footer>
  );
}

export default Footer;