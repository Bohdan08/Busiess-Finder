import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBusinessesList,
  setBusinessesList,
  setSearchForm,
} from "../redux/actions";
import BusinessesListComponent from "../components/BusinessesListComponent";
import { BUSINESSES_PER_PAGE } from "../constants";

const MainComponent = () => {
  /* Redux */
  const { businesses, searchForm } = useSelector((db) => db);
  const { location, term } = searchForm;
  const { data, error, loading, offset, total, currentPage } = businesses;

  const dispatch = useDispatch();

  /* Use Effect */

  useEffect(() => {
    // fetch default values on init
    dispatch(getBusinessesList({ location, term, offset: 0, currentPage: 0 }));
  }, []);

  /* Handlers */
  const submitForm = (event) => {
    event.preventDefault();

    // make an API call only if user types different input values
    if (location !== businesses.location || term !== businesses.term) {
      // Use Set to save the options in redux
      dispatch(
        setBusinessesList({ location, term, offset: 0, currentPage: 0 })
      );

      // Use Get to fetch API
      dispatch(getBusinessesList({ location, term, offset: 0 }));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      dispatch(
        setBusinessesList({
          currentPage: currentPage - 1,
        })
      );
    }
  };

  const handleNextPage = () => {
    const startIndex = currentPage * BUSINESSES_PER_PAGE;
    const endIndex = startIndex + BUSINESSES_PER_PAGE;
    const calculatedOffset = offset + BUSINESSES_PER_PAGE;

    // fetch data if requireed end index is higher than data length
    if (endIndex >= data.length) {
      dispatch(
        setBusinessesList({
          offset: calculatedOffset,
          currentPage: currentPage + 1,
          term,
        })
      );

      // Use Get to fetch API
      dispatch(getBusinessesList({ location, term, offset: calculatedOffset }));
    } else {
      // otherwise we only increment current page by 1
      dispatch(
        setBusinessesList({
          currentPage: currentPage + 1,
        })
      );
    }
  };

  const handleFormInput = (target) => {
    const { name, value } = target;

    dispatch(setSearchForm({ ...searchForm, [name]: value }));
  };

  return (
    <div>
      <Head>
        <title>Businesses Finder</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Find places & business by location."
        ></meta>
      </Head>
      <main>
        <div className="search-container flex justify-center items-center flex-col bg-header-background">
          <p className="text-6xl text-gray-50"> Business Finder </p>

          <form
            method="get"
            className="flex md:flex-row sm:flex-col p-10"
            onSubmit={submitForm}
          >
            <div className="flex flex-col">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location (Toronto, NYC)"
                maxLength={30}
                className="border py-3 px-3 text-grey-darkest  sm:mb-3 md:mb-0 sm:rounded md:rounded-none md:rounded-l-lg focus:outline-none w-80"
                value={location}
                onChange={({ target }) => handleFormInput(target)}
              />
              <i className="fas fa-thumbtack"></i>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="term"
                id="term"
                placeholder="Business Type (restaraunts, plumbers)"
                maxLength={30}
                className="border py-3 px-3 text-grey-darkest sm:mb-3 md:mb-0 sm:rounded md:rounded-none focus:outline-none w-80"
                value={term}
                onChange={({ target }) => handleFormInput(target)}
              />
            </div>
            <button
              type="submit"
              disabled={location === ""}
              className={`
              block bg-red-700 focus:outline-none text-white text-lg  py-1 px-4 md:rounded-r-lg
              sm:mt-2 md:mt-0 sm:rounded md:rounded-none sm:w-full h-auto
                    ${
                      location === ""
                        ? "cursor-not-allowed"
                        : "hover:bg-red-800"
                    }`}
              aria-label="Search Button"
            >
              <span className="md:hidden">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:float-right"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </main>

      {loading ? (
        <div className="loader mx-auto my-20"></div>
      ) : error ? (
        <div className="flex flex-col justify-center my-20 sm:mx-5 md:m-auto md:my-20 bg-red-400 py-3 md:w-1/3 sm:w-3/3 rounded">
          <p className="text-4xl text-white text-center">Error!</p>
          <p className="text-xl text-white text-center pt-2 py-2">{error}</p>
        </div>
      ) : !error && (!data || !data.length) ? (
        <div className="flex flex-col justify-center my-20 sm:mx-5 md:m-auto md:my-20 bg-blue-500 py-3 w-1/3 rounded">
          <p className="text-4xl text-white text-center">Not Found!</p>
          <p className="text-xl text-white text-center pt-2">
            Please try different options...
          </p>
        </div>
      ) : (
        <>
          <BusinessesListComponent
            data={data}
            location={businesses.location}
            term={businesses.term}
            total={total}
            offset={offset}
            currentPage={currentPage}
          />
          <div className="pagination-contaier d-flex flex-row justify-center  w-6/12 mx-auto text-center">
            <button
              disabled={currentPage === 0}
              className={`float-left   text-white rounded my-5 p-3 ${
                currentPage === 0
                  ? "cursor-not-allowed bg-blue-200"
                  : "bg-blue-500"
              }`}
              aria-label="Previous Page"
              onClick={handlePreviousPage}
            >
              Previous Page
            </button>
            <button
              disabled={offset >= total}
              aria-label="Next Page"
              className={`float-right text-white rounded my-5 p-3 ${
                offset >= total
                  ? "cursor-not-allowed bg-blue-200"
                  : "bg-blue-500"
              }`}
              onClick={handleNextPage}
            >
              Next Page
            </button>
          </div>
        </>
      )}

      <style jsx>
        {`
          .search-container {
            padding-top: 30px;
            height: 500px;
            background-color: #333;
            background-size: cover;
            background-position: 50%;
          }

          .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite; /* Safari */
            animation: spin 2s linear infinite;
          }

          /* Safari */
          @-webkit-keyframes spin {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}
      </style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default MainComponent;
