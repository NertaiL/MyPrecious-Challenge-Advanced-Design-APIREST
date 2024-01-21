const prepareHateoas = async (entity, data) => {
    const results = data
      .map((v) => {
        return {
          name: v.nombre,
          href: `/${entity}/${v.id}`,
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