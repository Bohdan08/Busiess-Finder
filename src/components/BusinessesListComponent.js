import React from "react";
import Image from "next/image";
import { BUSINESSES_PER_PAGE, BUSINESS_MAX_RATE } from "../constants";

const BusinessesListComponent = ({
  data,
  location,
  term,
  total,
  offset,
  currentPage,
}) => {
  const startIndex = currentPage * BUSINESSES_PER_PAGE;
  const endIndex = startIndex + BUSINESSES_PER_PAGE;
  const currentAmountOfBusinesses = offset + BUSINESSES_PER_PAGE;

  console.log(currentPage, "currentPage");
  console.log(startIndex, "startIndex");
  console.log(endIndex, "endIndexƒ");
  return (
    <>
      <p className="text-3xl text-center text-black py-5">
        <span className="capitalize">
          {term ? `${term} in ${location}` : `Browsing ${location} businesses`}{" "}
        </span>
        <span>
          ({currentAmountOfBusinesses} out of {total})
        </span>
        {console.log(offset, "offest")}
      </p>
      <div className="flex flex-row flex-wrap justify-center  ">
        {data.slice(startIndex, endIndex).map((obj) => {
          const {
            id,
            name,
            image_url,
            display_phone,
            rating,
            review_count,
            url,
          } = obj;

          return (
            <div
              key={id}
              className="p-2 m-4 border-2 border-gray-200 border-opacity-75 shadow-md shadow-lg rounded lg:w-5/12 md:w-full"
            >
              <div className="flex flex-row">
                <div>
                  <Image
                    src={image_url || "/images/notFound.png"}
                    width={200}
                    height={160}
                    alt={name}
                    className="rounded"
                  />
                </div>
                <div className="flex flex-col pl-4 pt-0 m-0">
                  <p className="capitalize text-2xl font-semibold text-left text-gray-600">
                    {name}
                  </p>
                  <div className="flex flex-col py-1">
                    <div className="flex flex-row">
                      <div>
                        {Array(BUSINESS_MAX_RATE)
                          .fill()
                          .map((_, key) => {
                            const starNumber = key + 1;
                            const isStarChecked =
                              starNumber <= Math.round(rating);

                            return (
                              <span
                                key={starNumber}
                                className={`fa fa-star  pl-0.5 ${
                                  isStarChecked
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              ></span>
                            );
                          })}
                      </div>
                      <span className="text-gray-black pl-2">{rating} </span>
                      <span className="text-gray-500 pl-1">
                        {" "}
                        ({review_count} Reviews)
                      </span>
                    </div>
                    <div className="text-gray-900 py-1">
                      {obj.location.display_address.map(
                        (adress) => ` ${adress} `
                      )}
                    </div>
                    <div>
                      <div className="flex flex-row py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="pl-1">
                          {display_phone || (
                            <span className="text-gray-400">Not Found</span>
                          )}
                        </span>
                      </div>
                      <div className="flex flex-row py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pl-1 hover:underline"
                        >
                          {" "}
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BusinessesListComponent;
