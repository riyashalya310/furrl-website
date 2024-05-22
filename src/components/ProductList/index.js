import { useEffect, useState } from "react";
import "./index.css";
import ProductCard from "../ProductCard";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const ProductList = () => {
  const [apiResponseFilters, setAPIResponseFilters] = useState({
    status: apiConstants.initial,
    data: null,
    errorMsg: null,
  });

  const [apiResponseProducts, setAPIResponseProducts] = useState({
    status: apiConstants.initial,
    data: null,
    errorMsg: null,
  });

  const [page, setPage] = useState(1);

  const apiCallFilters = async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingFilters";
    const options = {
      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        appversion: "1.0.234+145",
        "cache-control": "no-cache",
        "content-type": "application/json",
        deviceid: "",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        visitid: "2eE862pT1Z3eEHqcj2Aib",
      },
      referrer: "https://web.furrl.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"id":"#HomeHunts","entity":"vibe"}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      const filteredData = jsonResponse.data.getListingFilters.easyFilters.map(
        (item) => ({
          uniqueId: item.uniqueId,
          name: item.name,
        })
      );
      setAPIResponseFilters({
        status: apiConstants.success,
        data: filteredData,
        errorMsg: null,
      });
    } else {
      setAPIResponseFilters({
        status: apiConstants.failure,
        errorMsg: "Filters API failure",
      });
    }
  };

  const apiCallProducts = async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
    const jsonData = {
      input: {
        page, // Use the page variable here
        pageSize: 10,
        filters: [],
        id: "#HomeHunts",
        entity: "vibe",
      },
    };
    const options = {
      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        appversion: "1.0.234+145",
        "cache-control": "no-cache",
        "content-type": "application/json",
        deviceid: "",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        visitid: "2eE862pT1Z3eEHqcj2Aib",
      },
      referrer: "https://web.furrl.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(jsonData),
      method: "POST",
      mode: "cors",
      credentials: "omit",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      const totalProducts = {
        totalProducts: jsonResponse.data.getListingProducts.totalProducts,
      };
      const filteredDataProducts =
        jsonResponse.data.getListingProducts.products.map((item) => ({
          id: item.id,
          mrp: item.MRP.value,
          currency: item.MRP.currency,
          discountPercent: item.discountPercent,
          images: item.images.map((img) => ({
            src: img.src,
            height: img.height,
            width: img.width,
          })),
          price: item.price.value,
          title: item.title,
          vendor: item.vendor,
        }));
      const filteredData = {
        totalProducts: totalProducts.totalProducts,
        filteredDataProducts,
      };
      setAPIResponseProducts({
        status: apiConstants.success,
        data: filteredData,
        errorMsg: null,
      });
    } else {
      setAPIResponseProducts({
        status: apiConstants.failure,
        errorMsg: "Products API failed",
      });
    }
  };

  useEffect(() => {
    apiCallFilters();
    apiCallProducts();
  });

  const renderFiltersSuccessView = () => {
    const { data } = apiResponseFilters;
    return (
      <ul className="filters-container">
        {data.map((filter) => (
          <li key={filter.uniqueId}>
            <button type="button">{filter.name}</button>
          </li>
        ))}
      </ul>
    );
  };

  const renderDataFilters = () => {
    const { status } = apiResponseFilters;
    switch (status) {
      case apiConstants.success:
        return renderFiltersSuccessView();
      case apiConstants.failure:
        return renderFiltersFailureView();
      case apiConstants.loading:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const renderDataProducts = () => {
    const { status,data } = apiResponseProducts;
    switch (status) {
      case apiConstants.success:
        return renderProductsSuccessView(data);
      case apiConstants.failure:
        return renderProductsFailureView();
      case apiConstants.loading:
        return renderLoadingView();
      default:
        return null;
    }
  };

  // const fetchMoreData = async () => {
  //   setPage(page=>page + 1);
  //   const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
  //   const jsonData = {
  //     input: {
  //       page,
  //       pageSize: 10,
  //       filters: [],
  //       id: "#HomeHunts",
  //       entity: "vibe",
  //     },
  //   };
  //   const options = {
  //     headers: {
  //       accept: "application/json",
  //       "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
  //       appversion: "1.0.234+145",
  //       "cache-control": "no-cache",
  //       "content-type": "application/json",
  //       deviceid: "",
  //       pragma: "no-cache",
  //       priority: "u=1, i",
  //       "sec-ch-ua":
  //         '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  //       "sec-ch-ua-mobile": "?1",
  //       "sec-ch-ua-platform": '"Android"',
  //       "sec-fetch-dest": "document",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "same-site",
  //       visitid: "2eE862pT1Z3eEHqcj2Aib",
  //     },
  //     referrer: "https://web.furrl.in/",
  //     referrerPolicy: "strict-origin-when-cross-origin",
  //     body: JSON.stringify(jsonData),
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "omit",
  //   };
  //   const response = await fetch(url, options);
  //   if (response.ok) {
  //     const jsonResponse = await response.json();
  //     console.log(jsonResponse)
  //     const filteredData =
  //       jsonResponse.data.getListingProducts.products.map((item) => ({
  //         id: item.id,
  //         mrp: item.MRP.value,
  //         currency: item.MRP.currency,
  //         discountPercent: item.discountPercent,
  //         images: item.images.map((img) => ({
  //           src: img.src,
  //           height: img.height,
  //           width: img.width,
  //         })),
  //         price: item.price.value,
  //         title: item.title,
  //         vendor: item.vendor,
  //       }));
  //     setAPIResponseProducts({
  //       status: apiConstants.success,
  //       data: apiResponseProducts.data.filteredDataProducts.concat(
  //         filteredData
  //       ),
  //       errorMsg: null,
  //     });
  //   } else {
  //     setAPIResponseProducts({
  //       status: apiConstants.failure,
  //       errorMsg: "Products API failed",
  //     });
  //   }
  // };

  const renderProductsSuccessView = (data) => {
    return (
      <ul className="products-card-container">
        {/* <InfiniteScroll
          dataLength={data.filteredDataProducts.length}
          next={fetchMoreData}
          hasMore={
            data.filteredDataProducts.length <=
            data.totalProducts
          }
          loader={
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          }
        > */}
          {data.filteredDataProducts.map((product) => (
            <ProductCard details={product} key={product.id} products={apiResponseProducts.data.filteredDataProducts}/>
          ))}
        {/* </InfiniteScroll> */}
      </ul>
    );
  };

  const renderFiltersFailureView = () => {};

  const renderProductsFailureView = () => {};

  const renderLoadingView = () => {};


  return (
    <>
      <div className="render-product-List-container">
        <div>
          <p>Shop Products</p>
          {/* <p>{apiResponseProducts.data.totalProducts} Products</p> */}
        </div>
        {renderDataFilters()}
        {renderDataProducts()}
      </div>
    </>
  );
};

export default ProductList;
