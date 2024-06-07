interface Props extends React.HTMLAttributes<HTMLDialogElement> {
  open: boolean;
}

export function Dialog({ children, open, ...rest }: Props) {
  return (
    <dialog
      className={`absolute flex top-0 right-0 bottom-0 left-0 justify-center items-center bg-dialog-backdrop backdrop-blur-sm ${
        open ? "visible" : "invisible"
      } z-[102]`}
      {...rest}
    >
      <section className="px-12 py-8 bg-neutral-50 dark:bg-neutral-900 border-8 border-double border-neutral-600 text-xl">
        {children}
      </section>
    </dialog>
  );
}
