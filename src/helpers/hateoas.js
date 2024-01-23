const prepareHateoas = async (entity, data) => {
    const results = data
      .map((v) => {
        return {
          name: v.nombre,
          href: `/api/v1/${entity}/by/${v.id}`,
        };
      })
      .slice(0, 6);
    const totalJelwery = data.length;
    const stockTotal = data.reduce((total, item) => total + item.stock, 0);
    const HATEOAS = {
      totalJelwery,
      stockTotal,
      results,
    };
    return HATEOAS;
  };
  
  
  export default prepareHateoas;