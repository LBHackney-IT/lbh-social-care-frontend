import { prettyAddress } from 'lib/formatters';
import { Resident } from 'types';

interface Props {
  resident: Resident;
}

const Mapping = ({ resident }: Props): React.ReactElement => {
  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=300x300&return_error_code=true&location=${prettyAddress(
    resident
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}`;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=300x300&return_error_code=true&markers=${prettyAddress(
    resident
  )}&zoom=15&key=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}`;

  return (
    <section>
      <figure>
        <a href={`https://www.google.com/maps?q=${prettyAddress(resident)}`}>
          <img src={streetViewUrl} alt="" />
        </a>

        <figcaption>Street view</figcaption>
      </figure>

      <figure>
        <a href={`https://www.google.com/maps?q=${prettyAddress(resident)}`}>
          <img src={mapUrl} alt="" />
        </a>
        <figcaption>Map view</figcaption>
      </figure>
    </section>
  );
};

export default Mapping;
