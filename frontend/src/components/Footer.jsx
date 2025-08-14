function Footer() {
  return (
    <footer className="grid-layout bg-[var(--primary-color)] w-full max-w-none py-10">
      <div className="full-width-content place-items-center">
        <figure className="w-[200px] bg-gray-100 py-2 px-4 rounded-md mb-10">
          <img src="/logo-edited.png" alt="logo" />
        </figure>
        <small className="text-white">Copyright &copy; 2025</small>
      </div>
    </footer>
  );
}

export default Footer;