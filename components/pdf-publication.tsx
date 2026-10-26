type PdfPublicationProps = {
  path: string;
  title: string;
};

export function PdfPublication({ path, title }: PdfPublicationProps) {
  return (
    <section className="mt-12" aria-labelledby="document-viewer-heading">
      <div className="no-print flex flex-col gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="document-viewer-heading" className="font-semibold">Original document</h2>
          <p className="mt-1 text-sm text-muted">Read the supplied PDF in the embedded viewer or open it directly.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="button-secondary" href={path} target="_blank" rel="noreferrer">Open PDF</a>
          <a className="button-secondary" href={path} download>Download PDF</a>
        </div>
      </div>
      <object
        aria-label={`${title} PDF viewer`}
        className="mt-5 h-[65vh] min-h-[28rem] w-full rounded-xl border border-line bg-panel sm:min-h-[40rem]"
        data={`${path}#view=FitH`}
        type="application/pdf"
      >
        <div className="rounded-xl border border-line bg-panel p-6 text-sm text-muted">
          <p>This browser cannot display the embedded PDF.</p>
          <a className="mt-3 inline-flex font-medium text-accent hover:underline" href={path} target="_blank" rel="noreferrer">Open the PDF directly</a>
        </div>
      </object>
    </section>
  );
}
