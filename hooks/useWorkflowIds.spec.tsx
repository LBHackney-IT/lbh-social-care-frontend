import useWorkflowIds from './useWorkflowIds';
import * as SWR from 'swr';

jest.mock('swr');

describe('useWorkflowIds', () => {
  it('should work properly', async () => {
    jest.spyOn(SWR, 'default');

    useWorkflowIds('050001');
    expect(SWR.default).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/api/workflows/050001?per_page=20`,
      expect.any(Function)
    );
  });
  it('should handle no workflow id properly', async () => {
    jest.spyOn(SWR, 'default');

    useWorkflowIds();
    expect(SWR.default).toHaveBeenCalledWith(null, expect.any(Function));
  });
});
