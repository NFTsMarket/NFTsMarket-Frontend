const ProductFormPage = () => {
  return (
    <div>
      <h1> New product </h1>
      <form>
        <input type="text" placeholder="Write a title" />
        <br />
        <br />
        <textarea rows="2" placeholder="Write a de scription" />

        <button>Save</button>
      </form>
    </div>
  );
};

export default ProductFormPage;
