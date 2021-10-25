export interface Props {
  title: string;
  content?: string;
}

const AnnouncementMessage = ({ title, content }: Props): React.ReactElement => {
  return (
    <section
      className="lbh-page-announcement lbh-page-announcement--info"
      data-testid="announcement_message_box"
    >
      <h3 className="lbh-page-announcement__title">{title}</h3>
      <div className="lbh-page-announcement__content">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default AnnouncementMessage;
