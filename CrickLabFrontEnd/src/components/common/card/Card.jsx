function Card({ label, data }) {
  return (
    <div className="col-span-full md:col-span-1 block w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {label}
      </h5>
      <p className="font-normal text-center text-gray-700 dark:text-gray-400">{data}</p>
    </div>
  );
}

export default Card;
