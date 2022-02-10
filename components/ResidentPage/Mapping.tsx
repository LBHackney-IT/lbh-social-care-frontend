import { prettyAddress } from 'lib/formatters';
import { useState } from 'react';
import { Resident } from 'types';
import s from './Mapping.module.scss';

type TabState = 'map' | 'street-view';

interface Props {
  resident: Resident;
}

interface TabProps {
  active: TabState;
  value: TabState;
  label: string;
  setActive: (newActive: TabState) => void;
}

const Tab = ({ active, label, value, setActive }: TabProps) => (
  <li
    className={`govuk-tabs__list-item ${
      active === value ? 'govuk-tabs__list-item--selected' : ''
    }`}
  >
    <button className="govuk-tabs__tab" onClick={() => setActive(value)}>
      {label}
    </button>
  </li>
);

interface TabPanelProps {
  active: TabState;
  value: TabState;
  children: React.ReactChild;
}

const TabPanel = ({ active, value, children }: TabPanelProps) => (
  <section
    data-testid="panel"
    className={`govuk-tabs__panel ${s.tab} ${
      active !== value ? 'govuk-tabs__panel--hidden' : ''
    }`}
  >
    {children}
  </section>
);

const Mapping = ({ resident }: Props): React.ReactElement => {
  const [active, setActive] = useState<TabState>('map');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=360x360&return_error_code=true&markers=${prettyAddress(
    resident
  )}&zoom=15&key=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}`;

  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=360x360&return_error_code=true&location=${prettyAddress(
    resident
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}`;

  return (
    <div className={`govuk-tabs lbh-tabs ${s.tabs}`}>
      <ul className="govuk-tabs__list">
        <Tab label="Map" value="map" active={active} setActive={setActive} />
        <Tab
          label="Street view"
          value="street-view"
          active={active}
          setActive={setActive}
        />
      </ul>

      <TabPanel active={active} value="map">
        <a href={`https://www.google.com/maps?q=${prettyAddress(resident)}`}>
          <img src={mapUrl} alt="Map view" />
        </a>
      </TabPanel>

      <TabPanel active={active} value="street-view">
        <a href={`https://www.google.com/maps?q=${prettyAddress(resident)}`}>
          <img src={streetViewUrl} alt="Street view" />
        </a>
      </TabPanel>
    </div>
  );
};

export default Mapping;
