import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  getBusinessesList,
  setBusinessesList,
  getAutocompleteList,
  setSearchForm,
} from "../redux/actions";
import {
  BUSINESSES_PER_PAGE,
  TOO_MANY_REQUESTS_ERROR_CODE,
} from "../constants";
import {
  BusinessesListComponent,
  AutocompleteMenuComponent,
} from "../components";
import { debounce } from "lodash";

const MainComponent = () => {
  /* Redux */
  const { businesses, searchForm, autoComplete } = useSelector((db) => db);
  const { location, term } = searchForm;
  const { data, error, loading, offset, total, currentPage } = businesses;

  const dispatch = useDispatch();

  /* Use States */
  const [inputTerm, setInputTerm] = useState(false);

  /* Use Effect */
  useEffect(() => {
    // fetch default values on init
    dispatch(getBusinessesList({ location, term, offset: 0, currentPage: 0 }));
  }, []);

  useEffect(() => {
    // 403 => CORS IS NOT ACTIVATED, ask a user to activate it
    if (error && error.code && error.code == 403) {
      Swal.fire({
        icon: "warning",
        title: "CORS POLICY",
        html: `
        Please visit  
        <a href="https://cors-anywhere.herokuapp.com/"
          class="text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://cors-anywhere.herokuapp.com/
        </a>
        and click on the
        <span>"Request temporary access to the demo server"</span>
        button, to temporarily restore the full functionality of this
        application.`,
        confirmButtonText: "Ok",
        showCancelButton: true,
      }).then(
        ({ isConfirmed }) =>
          isConfirmed &&
          window.open("https://cors-anywhere.herokuapp.com/", "_blank")
      );
    }
  }, [error]);

  useEffect(() => {
    const handleDocumentMouseUp = (event) => {
      if (event.button !== 2) {
        setTimeout(() => {
          setInputTerm(false);
        }, 10);
      }
    };

    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, []);

  /* Handlers */
  const submitForm = (event) => {
    event.preventDefault();

    // Use Set to save the options in redux
    dispatch(setBusinessesList({ location, term, offset: 0, currentPage: 0 }));

    // Use Get to fetch API
    dispatch(getBusinessesList({ location, term, offset: 0 }));
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
      dispatch(
        getBusinessesList({
          location: businesses.location,
          term: businesses.term,
          offset: calculatedOffset,
        })
      );
    } else {
      // otherwise we only increment current page by 1
      dispatch(
        setBusinessesList({
          currentPage: currentPage + 1,
        })
      );
    }
  };

  const handleFormInput = (name, value) => {
    dispatch(setSearchForm({ ...searchForm, [name]: value }));

    if (name !== "location" && window.innerWidth > 767) {
      setInputTerm(true);
      callAutoComplete(value);
    }
  };

  const callAutoComplete = useCallback(
    debounce((value) => dispatch(getAutocompleteList({ text: value })), 300),
    []
  );

  return (
    <div>
      <Head>
        <title>Businesses Finder</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
        {/* a polyfill for ES6 Promises for IE11 */}
        <script src="//cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.js"></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Find places & business by location."
        ></meta>
      </Head>
      <main>
        <div className="search-container flex justify-center items-center flex-col bg-header-background">
          <p className="md:text-5xl text-4xl text-gray-50">
            Discover Businesses
          </p>
          <form
            method="get"
            className="flex md:flex-row flex-col p-10"
            onSubmit={submitForm}
          >
            <div className="flex flex-col">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location (Toronto, NYC)"
                maxLength={30}
                className="border py-3 px-3 text-grey-darkest  mb-3 md:mb-0 rounded md:rounded-none md:rounded-l-lg focus:outline-none w-80 sm:mb-0"
                value={location}
                onChange={({ target }) => {
                  const { name, value } = target;
                  return handleFormInput(name, value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="term"
                id="term"
                placeholder="Business Type (restaraunts, plumbers)"
                maxLength={30}
                className="border py-3 px-3 text-grey-darkest mb-3 md:mb-0 rounded md:rounded-none focus:outline-none w-80"
                value={term}
                onChange={({ target }) => {
                  const { name, value } = target;
                  return handleFormInput(name, value);
                }}
              />
              {inputTerm &&
                autoComplete.data &&
                autoComplete.data.length > 0 && (
                  <AutocompleteMenuComponent
                    name="term"
                    data={autoComplete.data}
                    handleFormInput={handleFormInput}
                  />
                )}
            </div>
            <button
              type="submit"
              disabled={
                location === "" ||
                (location === businesses.location && term === businesses.term)
              }
              className={`
              block focus:outline-none text-white text-lg  py-1 px-4 md:rounded-r-lg
              mt-2 md:mt-0 rounded md:rounded-none w-full h-auto
              search-button tooltip
                    ${
                      location === "" ||
                      (location === businesses.location &&
                        term === businesses.term)
                        ? "cursor-not-allowed bg-red-300"
                        : "hover:bg-red-800 bg-red-700"
                    }`}
              aria-label="Search Button"
            >
              <span className="md:hidden">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 float-right"
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
              {location === "" && (
                <span className="tooltiptext">
                  Location is reqired for searching.
                </span>
              )}
              {location === businesses.location && term === businesses.term && (
                <span className="tooltiptext">
                  You already viewing {term} in {location}.
                  <br />
                  Please type out other criteria for searching.
                </span>
              )}
            </button>
          </form>
        </div>
      </main>

      {loading ? (
        <div className="loader mx-auto my-20"></div>
      ) : error ? (
        <div className="flex flex-col justify-center sm:my-20 my-10 mx-5 md:m-auto md:my-20 bg-red-400 py-3 md:w-2/3  w-3/3 rounded ">
          <p className="text-4xl text-white text-center">Error {error.code}!</p>
          <p className="text-xl text-white text-center pt-2 py-2">
            {error.message}
          </p>
          {error.code && error.code == 403 && (
            <p className="text-xl text-white text-center pt-2 py-2 px-2">
              Perhaps, you need to activate CORS policy for this application due
              to the fact that Yelp API doesn't support it.
              <br />
              Please visit{" "}
              <a
                href="https://cors-anywhere.herokuapp.com/"
                className="underline text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://cors-anywhere.herokuapp.com/
              </a>{" "}
              and click on the
              {"  "}
              <span>"Request temporary access to the demo server"</span>
              {"  "}
              button, to temporarily restore the full functionality.
            </p>
          )}
        </div>
      ) : !error && (!data || !data.length) ? (
        <div className="flex flex-col justify-center my-20 mx-5 md:m-auto md:my-20 bg-blue-500 py-3 w-1/3 rounded">
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
            currentPage={currentPage}
          />
          <div className="pagination-contaier d-flex md:flex-row flex-col justify-center sm:w-6/12 w-11/12 mx-auto text-center mb-3 sm:mb-0">
            <button
              disabled={currentPage === 0}
              className={`sm:float-left text-white rounded sm:my-5 my-3 p-3 focus:outline-none w-full md:w-32 ${
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
              className={`sm:float-right text-white rounded sm:my-5 my-3 p-3 focus:outline-none w-full md:w-32 ${
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
            width: 100vw;
            padding-top: 30px;
            height: 500px;
            background-color: #333;
            background-size: cover;
            background-position: 50%;
            overflow: hidden;
          }

          .search-button {
            height: 50px;
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

          .tooltip {
            position: relative;
          }

          .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 5px;

            /* Position the tooltip */
            position: absolute;
            z-index: 1;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
          }

          .tooltip:hover .tooltiptext {
            visibility: visible;
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

            .tooltiptext {
              display: none;
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
