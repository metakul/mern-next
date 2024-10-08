
  const BlogColumn = (
) => [
    { field: "cryptoSymbol", headerName: "Cryoto Name", width: 80, editable: false },
    // {
    //   field: "cryptoSymbol",
    //   headerName: "Symbol",
    //   width: 120,
    //   editable: false,
    // },
    {
      field: "currency",
      headerName: "currency",
      width: 80,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
      editable: false,
    },
  ];

export default BlogColumn;