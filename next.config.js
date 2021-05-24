module.exports = {
  distDir: 'build/_next',
  target: 'server',
  future: {
    webpack5: true,
  },
  async redirects() {
    let redirects = maintenanceMode();
    return redirects.filter(Boolean);
  },
};

function maintenanceMode() {
  let maintenance_array = [];

  if (
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE &&
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === '1'
  ) {
    let pages = [
      '/access-denied',
      '/forms-in-progress',
      '/login',
      '/logout',
      '/index',
      '/search',
      '/my-records',
      '/workers',
      '/workers/:slug*',
      '/api/:slug*',
      '/people',
      '/people/:slug*',
      '/submissions:slug*',
    ];

    pages.forEach((elm) => {
      maintenance_array = [
        ...maintenance_array,
        {
          source: elm,
          basePath: false,
          destination: '/maintenance',
          permanent: false,
        },
      ];
    });
  } else {
    maintenance_array = [
      ...maintenance_array,
      {
        source: '/maintenance',
        destination: '/',
        basePath: false,
        permanent: false,
      },
    ];
  }
  return maintenance_array;
}
