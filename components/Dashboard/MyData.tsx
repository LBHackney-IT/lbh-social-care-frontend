import { useMyData } from 'utils/api/me';
import { getUserType } from 'utils/user';
import s from './DashboardWrapper.module.scss';

const MyData: React.FC = () => {
  const { data } = useMyData();

  if (data)
    return (
      <div className={s.myData}>
        <h2 className="lbh-heading-h5">
          {data.firstName} {data.lastName}
        </h2>

        <p className="lbh-body-s">{data.email}</p>

        <p className="lbh-body-xs">
          {data.role} · {getUserType(data.auth)}
          {data.teams.length > 0 &&
            ` · ${data.teams.map((team) => team.name).join(', ')}`}
          {data.auth.hasUnrestrictedPermissions &&
            ` · Can see restricted records`}
          {data.auth.hasAllocationsPermissions && ` · Can allocate`}
        </p>
      </div>
    );

  return null;
};

export default MyData;
