import { Media } from 'types';
import s from './index.module.scss';

interface Props {
  media: Media;
}

const MediaTile = ({ media }: Props): React.ReactElement => (
  <li className={s.tile}>
    <img src={media.files.medium?.url} alt={media.title} loading="lazy" />

    <div className={s.tileMeta}>
      <button>
        <h3 className="lbh-heading-h4">{media.title}</h3>
      </button>
      <p className="lbh-body-s">Uploaded XX by XX</p>
    </div>
  </li>
);

export default MediaTile;
