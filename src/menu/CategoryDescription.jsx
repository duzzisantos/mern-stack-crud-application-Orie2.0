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
    <Container className="col-12 p-3 custom-pry-color">
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

            <div className="col-12 d-flex flex-lg-row flex-sm-column gap-1 shadow-sm">
              <article className="col-lg-6 col-sm-12 col-md-10 p-4">
                <h5>{currentState} introduction</h5>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores explicabo beatae praesentium, odio error voluptatibus
                recusandae voluptate eius officiis pariatur nulla doloremque
                enim, aspernatur totam tempora veniam excepturi expedita
                aperiam? Necessitatibus distinctio, labore voluptas laboriosam
                fuga in iusto obcaecati temporibus vitae excepturi velit quis
                reprehenderit accusamus minima magni aperiam dignissimos nam
                error placeat vel dicta hic libero autem officiis. Alias!
                Dolorem hic voluptatem nobis adipisci repudiandae accusamus quas
                odit facilis, officiis incidunt totam cum tenetur neque
                molestias vel aliquam ex quod magnam dolor sequi maiores
                explicabo itaque ipsam corrupti. Sint?
              </article>
              <article className="col-lg-6 col-sm-12 col-md-10 p-4">
                <h5>{currentState} more information</h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                dicta obcaecati nobis, harum quaerat aut ab expedita ea
                sapiente, enim consequuntur at, error saepe quibusdam voluptates
                atque? Illo, rerum tempore. Ratione culpa eos non quae soluta
                inventore possimus magni quidem eius, quod molestias
                praesentium, minima, in ipsa. Neque doloribus cum dicta
                molestias qui aperiam. Assumenda unde minus ea laboriosam eum.
                Illo tempora aliquam ipsum repudiandae? Rem atque velit quis
                corrupti, esse rerum reiciendis distinctio deserunt qui modi
                molestiae omnis aperiam repellat quia alias reprehenderit cum
                minus! Facere culpa molestias sunt.
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
