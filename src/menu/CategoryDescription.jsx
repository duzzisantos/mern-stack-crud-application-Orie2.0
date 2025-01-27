import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ShoppingLady from "../images/shopping-lady.jpg";
import VendorListByCategory from "../tables/VendorListByCategory";
import { useVendorItems } from "../hooks/useVendorItems";

const CategoryDescription = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { state } = useLocation();
  const currentState = !selectedCategory ? state : selectedCategory;

  const {
    vendors,
    vendorCategories,
    regions,
    rowSelection,
    colDefs,
    pageSize,
    pageSizeSelector,
    pagination,
  } = useVendorItems(user, currentState);

  const mergedCategoryList = [...regions, ...vendorCategories()];

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container
      className="col-12 custom-pry-color"
      style={{ paddingTop: "80px" }}
    >
      <div className="px-4 mx-2">
        <h1 className="fs-3 fw-bold col-9">{currentState}</h1>

        <Form.Group className="col-lg-2 col-sm-6">
          <Form.Label>Change category</Form.Label>
          <Form.Select
            size="sm"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            <option value="">Please select</option>
            {mergedCategoryList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="col-12 justify-content-center bottom-0 h-100">
        <section className=" ps-4 gap-3 mt-3">
          <div className="d-flex flex-column gap-3 p-2">
            <article
              className="col-12 p-4 shadow-sm"
              style={{
                height: "450px",
                backgroundImage: `url(${ShoppingLady})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3 className="h5">About {currentState}</h3>
              This is one avenue we source from on this platform. Enjoy the
              vendors as you surf through.
            </article>

            <div className="col-12 d-flex flex-lg-row flex-sm-column stack-categories gap-1 shadow-sm">
              <article className="col-lg-6 col-sm-12 col-md-10 p-4">
                <h5>{currentState} introduction</h5>
                Find businesses and services faster than ever before. Easily
                search, compare, and connect with trusted providers. Access a
                comprehensive directory for local and global needs. Save time
                with instant results and tailored recommendations. Perfect for
                personal use or boosting your business visibility. Discover
                reviews, contact details, and more in one place. Join the Dugam
                community today and simplify your search.
              </article>
              <article className="col-lg-6 col-sm-12 col-md-10 p-4">
                <h5>{currentState} more information</h5>
                Quickly find businesses and services near you. Search smarter
                with a streamlined, user-friendly experience. From local shops
                to global providers, it's all here. Compare options, read
                reviews, and make informed decisions. Boost your business by
                connecting with new customers. Save time and effort with Dugam’s
                powerful search tools. Join thousands already discovering more
                with Dugam. Start exploring today—Dugam makes it simple.
              </article>
            </div>
          </div>
        </section>
        <section className="mt-5 ps-3 mx-3 gap-3">
          <h3 className="fw-bold my-3">Vendors in {currentState}</h3>
          <VendorListByCategory
            vendors={vendors}
            colDefs={colDefs}
            rowSelection={rowSelection}
            pageSize={pageSize}
            pageSizeSelector={pageSizeSelector}
            pagination={pagination}
          />
        </section>
      </div>
    </Container>
  );
};

export default CategoryDescription;
