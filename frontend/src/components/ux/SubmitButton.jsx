function SubmitButton({ children, className="" }) {
  return (
    <button type="submit" className={`${className} px-2.5 py-1.5 rounded-md transition cursor-pointer mt-1.5`}>
      {children}
    </button>
  );
}

export default SubmitButton;