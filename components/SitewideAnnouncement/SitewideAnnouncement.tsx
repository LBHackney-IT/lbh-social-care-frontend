const SiteWideAnnouncement = (): React.ReactElement => {
  return (
    <section className="lbh-announcement lbh-announcement--site lbh-announcement--site--warning">
      <div className="lbh-container">
        <h3 className="lbh-announcement__title">
          DO <span className="underline">NOT</span> RECORD HERE !
        </h3>
        <div className="lbh-announcement__content">
          <p>
            All information needs to be entered onto Mosaic only.
            <br />
            See the{' '}
            <a href="https://intranet.hackney.gov.uk/mosaic-for-adults-social-care">
              {' '}
              Adults Social Care Mosaic Pages{' '}
            </a>{' '}
            on the intranet
          </p>
        </div>
      </div>
    </section>
  );
};

export default SiteWideAnnouncement;
