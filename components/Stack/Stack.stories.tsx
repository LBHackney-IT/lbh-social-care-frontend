import Stack from './Stack';

export default {
  title: 'Stack',
  component: Stack,
};

export const Default = (): React.ReactElement => (
  <Stack space={7} className="foobar">
    <div>foo</div>
    <div>bar</div>
    <div>foobar</div>
  </Stack>
);

export const NoSpace = (): React.ReactElement => (
  <Stack space={0} className="foobar">
    <div>foo</div>
    <div>bar</div>
    <div>foobar</div>
  </Stack>
);
