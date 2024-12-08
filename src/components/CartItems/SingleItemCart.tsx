"use client";
import { isAuthenticated } from "@/lib/slices/authSlice";
import { selectCartItems } from "@/lib/slices/DropShip/AddToCartSlice";
import { addToCartApi, removeItemQuantityApi } from "@/lib/slices/DropShip/DropShipAPI";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function Cart({cartProducts,totalPrice}:any) {

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch<AppDispatch>()
  const isUserAuthenticated = useSelector(isAuthenticated);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemQuantityApi({ itemId: id, isAuthenticated: isUserAuthenticated })); // Dispatch action to remove an item
  };

  const handleAddToCart = (selectedDropShipItem:any) => {
    if (cartItems) {
      const cartItem = {
        id:  selectedDropShipItem.id ,
        name: selectedDropShipItem.name,
        image: selectedDropShipItem.image,
        size: selectedDropShipItem.size,
        quantity: 1,
        // color: currentColor.value,
      };
      dispatch(addToCartApi({ item: cartItem, isAuthenticated: isUserAuthenticated }));
    }
  };

  
  const setQuantity = (id: any, quantity: number) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm: { id: any; }) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
    }
  };

  return (
    <section className="flat-spacing-2">
      <div className="container">
        {/* <div className="tf-page-cart text-center mt_140 mb_200">
              <h5 className="mb_24">Your cart is empty</h5>
              <p className="mb_24">You may check out all the available products and buy some in the shop</p>
              <Link to={`/shop-default`} className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Return to shop<i className="icon icon-arrow1-top-left"></i></Link>
          </div> */}
        <div className="tf-cart-countdown">
          <div className="title-left">
            <svg
              className="d-inline-block"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={24}
              viewBox="0 0 16 24"
              fill="rgb(219 18 21)"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0899 24C11.3119 22.1928 11.4245 20.2409 10.4277 18.1443C10.1505 19.2691 9.64344 19.9518 8.90645 20.1924C9.59084 18.2379 9.01896 16.1263 7.19079 13.8576C7.15133 16.2007 6.58824 17.9076 5.50148 18.9782C4.00436 20.4517 4.02197 22.1146 5.55428 23.9669C-0.806588 20.5819 -1.70399 16.0418 2.86196 10.347C3.14516 11.7228 3.83141 12.5674 4.92082 12.8809C3.73335 7.84186 4.98274 3.54821 8.66895 0C8.6916 7.87426 11.1062 8.57414 14.1592 12.089C17.4554 16.3071 15.5184 21.1748 10.0899 24Z"
              />
            </svg>
            <p>These products are limited, checkout Now</p>
          </div>
          <div
            className="js-countdown timer-count"
            data-timer={600}
            data-labels="d:,h:,m:,s"
          />
        </div>
        <div className="tf-page-cart-wrap">
          <div className="tf-page-cart-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <table className="tf-table-page-cart">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((elm:any, i:any) => (
                    <tr key={i} className="tf-cart-item file-delete">
                      <td className="tf-cart-item_product">
                        <Link
                          to={`/product-detail/${elm.id}`}
                          className="img-box"
                        >
                          <img
                            alt="img-product"
                            src={`data:image/png;base64,${elm.image}`}
                            width={668}
                            height={932}
                          />
                        </Link>
                        <div className="cart-info">
                          <Link
                            to={`/product-detail/${elm.id}`}
                            className="cart-title link"
                          >
                            {elm.title}
                          </Link>
                          <div className="cart-meta-variant">Size : {elm.size}</div>
                          <span
                            className="remove-cart link remove"
                            onClick={() => handleRemoveItem(elm.id)}
                          >
                            Remove
                          </span>
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_price"
                        cart-data-title="Price"
                      >
                        <div className="cart-price">
                        ₹{elm?.price?.toFixed(2)}
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_quantity"
                        cart-data-title="Quantity"
                      >
                        <div className="cart-quantity">
                          <div className="wg-quantity">
                            <span
                              className="btn-quantity minus-btn"
                              onClick={() =>
                                handleRemoveItem(elm.id)
                              }
                            >
                              <svg
                                className="d-inline-block"
                                width={9}
                                height={1}
                                viewBox="0 0 9 1"
                                fill="currentColor"
                              >
                                <path d="M9 1H5.14286H3.85714H0V1.50201e-05H3.85714L5.14286 0L9 1.50201e-05V1Z" />
                              </svg>
                            </span>
                            <input
                              type="text"
                              name="number"
                              value={elm.quantity}
                              min={1}
                              onChange={(e) =>
                                setQuantity(elm.id, Number(e.target.value))
                              }
                            />
                            <span
                              className="btn-quantity plus-btn"
                              onClick={() =>
                                handleAddToCart(elm)
                              }
                            >
                              <svg
                                className="d-inline-block"
                                width={9}
                                height={9}
                                viewBox="0 0 9 9"
                                fill="currentColor"
                              >
                                <path d="M9 5.14286H5.14286V9H3.85714V5.14286H0V3.85714H3.85714V0H5.14286V3.85714H9V5.14286Z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_total"
                        cart-data-title="Total"
                      >
                        <div
                          className="cart-total"
                          style={{ minWidth: "60px" }}
                        >
                          ₹ {(elm.price * elm.quantity).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!cartItems.length && (
                <>
                  <div className="row align-items-center mb-5">
                    <div className="col-6 fs-18">Your shop cart is empty</div>
                    <div className="col-6">
                      <Link
                        to={`/`}
                        className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                        style={{ width: "fit-content" }}
                      >
                        Explore Products!
                      </Link>
                    </div>
                  </div>
                </>
              )}
              <div className="tf-page-cart-note">
                <label htmlFor="cart-note">Add Order Note</label>
                <textarea
                  name="note"
                  id="cart-note"
                  placeholder="How can we help you?"
                  defaultValue={""}
                />
              </div>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
             
              <div className="tf-page-cart-checkout">
                <div className="shipping-calculator">
                  <summary
                    className="accordion-shipping-header d-flex justify-content-between align-items-center collapsed"
                    data-bs-target="#shipping"
                    data-bs-toggle="collapse"
                    aria-controls="shipping"
                  >
                    <h3 className="shipping-calculator-title">
                      Estimate Shipping: 0.00
                    </h3>
                    {/* <span className="shipping-calculator_accordion-icon" /> */}
                  </summary>
                  <div className="collapse" id="shipping">
                    <div className="accordion-shipping-content">
                      <fieldset className="field">
                        <label className="label">Country</label>
                        <select
                          className="tf-select w-100"
                          id="ShippingCountry_CartDrawer-Form"
                          name="address[country]"
                          data-default=""
                        >
                          <option value="---" data-provinces="[]">
                            ---
                          </option>
                          <option
                            value="Australia"
                            data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]"
                          >
                            Australia
                          </option>
                          <option value="Austria" data-provinces="[]">
                            Austria
                          </option>
                          <option value="Belgium" data-provinces="[]">
                            Belgium
                          </option>
                          <option
                            value="Canada"
                            data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]"
                          >
                            Canada
                          </option>
                          <option value="Czech Republic" data-provinces="[]">
                            Czechia
                          </option>
                          <option value="Denmark" data-provinces="[]">
                            Denmark
                          </option>
                          <option value="Finland" data-provinces="[]">
                            Finland
                          </option>
                          <option value="France" data-provinces="[]">
                            France
                          </option>
                          <option value="Germany" data-provinces="[]">
                            Germany
                          </option>
                          <option
                            value="Hong Kong"
                            data-provinces="[['Hong Kong Island','Hong Kong Island'],['Kowloon','Kowloon'],['New Territories','New Territories']]"
                          >
                            Hong Kong SAR
                          </option>
                          <option
                            value="Ireland"
                            data-provinces="[['Carlow','Carlow'],['Cavan','Cavan'],['Clare','Clare'],['Cork','Cork'],['Donegal','Donegal'],['Dublin','Dublin'],['Galway','Galway'],['Kerry','Kerry'],['Kildare','Kildare'],['Kilkenny','Kilkenny'],['Laois','Laois'],['Leitrim','Leitrim'],['Limerick','Limerick'],['Longford','Longford'],['Louth','Louth'],['Mayo','Mayo'],['Meath','Meath'],['Monaghan','Monaghan'],['Offaly','Offaly'],['Roscommon','Roscommon'],['Sligo','Sligo'],['Tipperary','Tipperary'],['Waterford','Waterford'],['Westmeath','Westmeath'],['Wexford','Wexford'],['Wicklow','Wicklow']]"
                          >
                            Ireland
                          </option>
                          <option value="Israel" data-provinces="[]">
                            Israel
                          </option>
                          <option
                            value="Italy"
                            data-provinces="[['Agrigento','Agrigento'],['Alessandria','Alessandria'],['Ancona','Ancona'],['Aosta','Aosta Valley'],['Arezzo','Arezzo'],['Ascoli Piceno','Ascoli Piceno'],['Asti','Asti'],['Avellino','Avellino'],['Bari','Bari'],['Barletta-Andria-Trani','Barletta-Andria-Trani'],['Belluno','Belluno'],['Benevento','Benevento'],['Bergamo','Bergamo'],['Biella','Biella'],['Bologna','Bologna'],['Bolzano','South Tyrol'],['Brescia','Brescia'],['Brindisi','Brindisi'],['Cagliari','Cagliari'],['Caltanissetta','Caltanissetta'],['Campobasso','Campobasso'],['Carbonia-Iglesias','Carbonia-Iglesias'],['Caserta','Caserta'],['Catania','Catania'],['Catanzaro','Catanzaro'],['Chieti','Chieti'],['Como','Como'],['Cosenza','Cosenza'],['Cremona','Cremona'],['Crotone','Crotone'],['Cuneo','Cuneo'],['Enna','Enna'],['Fermo','Fermo'],['Ferrara','Ferrara'],['Firenze','Florence'],['Foggia','Foggia'],['Forlì-Cesena','Forlì-Cesena'],['Frosinone','Frosinone'],['Genova','Genoa'],['Gorizia','Gorizia'],['Grosseto','Grosseto'],['Imperia','Imperia'],['Isernia','Isernia'],['L'Aquila','L’Aquila'],['La Spezia','La Spezia'],['Latina','Latina'],['Lecce','Lecce'],['Lecco','Lecco'],['Livorno','Livorno'],['Lodi','Lodi'],['Lucca','Lucca'],['Macerata','Macerata'],['Mantova','Mantua'],['Massa-Carrara','Massa and Carrara'],['Matera','Matera'],['Medio Campidano','Medio Campidano'],['Messina','Messina'],['Milano','Milan'],['Modena','Modena'],['Monza e Brianza','Monza and Brianza'],['Napoli','Naples'],['Novara','Novara'],['Nuoro','Nuoro'],['Ogliastra','Ogliastra'],['Olbia-Tempio','Olbia-Tempio'],['Oristano','Oristano'],['Padova','Padua'],['Palermo','Palermo'],['Parma','Parma'],['Pavia','Pavia'],['Perugia','Perugia'],['Pesaro e Urbino','Pesaro and Urbino'],['Pescara','Pescara'],['Piacenza','Piacenza'],['Pisa','Pisa'],['Pistoia','Pistoia'],['Pordenone','Pordenone'],['Potenza','Potenza'],['Prato','Prato'],['Ragusa','Ragusa'],['Ravenna','Ravenna'],['Reggio Calabria','Reggio Calabria'],['Reggio Emilia','Reggio Emilia'],['Rieti','Rieti'],['Rimini','Rimini'],['Roma','Rome'],['Rovigo','Rovigo'],['Salerno','Salerno'],['Sassari','Sassari'],['Savona','Savona'],['Siena','Siena'],['Siracusa','Syracuse'],['Sondrio','Sondrio'],['Taranto','Taranto'],['Teramo','Teramo'],['Terni','Terni'],['Torino','Turin'],['Trapani','Trapani'],['Trento','Trentino'],['Treviso','Treviso'],['Trieste','Trieste'],['Udine','Udine'],['Varese','Varese'],['Venezia','Venice'],['Verbano-Cusio-Ossola','Verbano-Cusio-Ossola'],['Vercelli','Vercelli'],['Verona','Verona'],['Vibo Valentia','Vibo Valentia'],['Vicenza','Vicenza'],['Viterbo','Viterbo']]"
                          >
                            Italy
                          </option>
                          <option
                            value="Japan"
                            data-provinces="[['Aichi','Aichi'],['Akita','Akita'],['Aomori','Aomori'],['Chiba','Chiba'],['Ehime','Ehime'],['Fukui','Fukui'],['Fukuoka','Fukuoka'],['Fukushima','Fukushima'],['Gifu','Gifu'],['Gunma','Gunma'],['Hiroshima','Hiroshima'],['Hokkaidō','Hokkaido'],['Hyōgo','Hyogo'],['Ibaraki','Ibaraki'],['Ishikawa','Ishikawa'],['Iwate','Iwate'],['Kagawa','Kagawa'],['Kagoshima','Kagoshima'],['Kanagawa','Kanagawa'],['Kumamoto','Kumamoto'],['Kyōto','Kyoto'],['Kōchi','Kochi'],['Mie','Mie'],['Miyagi','Miyagi'],['Miyazaki','Miyazaki'],['Nagano','Nagano'],['Nagasaki','Nagasaki'],['Nara','Nara'],['Niigata','Niigata'],['Okayama','Okayama'],['Okinawa','Okinawa'],['Saga','Saga'],['Saitama','Saitama'],['Shiga','Shiga'],['Shimane','Shimane'],['Shizuoka','Shizuoka'],['Tochigi','Tochigi'],['Tokushima','Tokushima'],['Tottori','Tottori'],['Toyama','Toyama'],['Tōkyō','Tokyo'],['Wakayama','Wakayama'],['Yamagata','Yamagata'],['Yamaguchi','Yamaguchi'],['Yamanashi','Yamanashi'],['Ōita','Oita'],['Ōsaka','Osaka']]"
                          >
                            Japan
                          </option>
                          <option
                            value="Malaysia"
                            data-provinces="[['Johor','Johor'],['Kedah','Kedah'],['Kelantan','Kelantan'],['Kuala Lumpur','Kuala Lumpur'],['Labuan','Labuan'],['Melaka','Malacca'],['Negeri Sembilan','Negeri Sembilan'],['Pahang','Pahang'],['Penang','Penang'],['Perak','Perak'],['Perlis','Perlis'],['Putrajaya','Putrajaya'],['Sabah','Sabah'],['Sarawak','Sarawak'],['Selangor','Selangor'],['Terengganu','Terengganu']]"
                          >
                            Malaysia
                          </option>
                          <option value="Netherlands" data-provinces="[]">
                            Netherlands
                          </option>
                          <option
                            value="New Zealand"
                            data-provinces="[['Auckland','Auckland'],['Bay of Plenty','Bay of Plenty'],['Canterbury','Canterbury'],['Chatham Islands','Chatham Islands'],['Gisborne','Gisborne'],['Hawke's Bay','Hawke’s Bay'],['Manawatu-Wanganui','Manawatū-Whanganui'],['Marlborough','Marlborough'],['Nelson','Nelson'],['Northland','Northland'],['Otago','Otago'],['Southland','Southland'],['Taranaki','Taranaki'],['Tasman','Tasman'],['Waikato','Waikato'],['Wellington','Wellington'],['West Coast','West Coast']]"
                          >
                            New Zealand
                          </option>
                          <option value="Norway" data-provinces="[]">
                            Norway
                          </option>
                          <option value="Poland" data-provinces="[]">
                            Poland
                          </option>
                          <option
                            value="Portugal"
                            data-provinces="[['Aveiro','Aveiro'],['Açores','Azores'],['Beja','Beja'],['Braga','Braga'],['Bragança','Bragança'],['Castelo Branco','Castelo Branco'],['Coimbra','Coimbra'],['Faro','Faro'],['Guarda','Guarda'],['Leiria','Leiria'],['Lisboa','Lisbon'],['Madeira','Madeira'],['Portalegre','Portalegre'],['Porto','Porto'],['Santarém','Santarém'],['Setúbal','Setúbal'],['Viana do Castelo','Viana do Castelo'],['Vila Real','Vila Real'],['Viseu','Viseu'],['Évora','Évora']]"
                          >
                            Portugal
                          </option>
                          <option value="Singapore" data-provinces="[]">
                            Singapore
                          </option>
                          <option
                            value="South Korea"
                            data-provinces="[['Busan','Busan'],['Chungbuk','North Chungcheong'],['Chungnam','South Chungcheong'],['Daegu','Daegu'],['Daejeon','Daejeon'],['Gangwon','Gangwon'],['Gwangju','Gwangju City'],['Gyeongbuk','North Gyeongsang'],['Gyeonggi','Gyeonggi'],['Gyeongnam','South Gyeongsang'],['Incheon','Incheon'],['Jeju','Jeju'],['Jeonbuk','North Jeolla'],['Jeonnam','South Jeolla'],['Sejong','Sejong'],['Seoul','Seoul'],['Ulsan','Ulsan']]"
                          >
                            South Korea
                          </option>
                          <option
                            value="Spain"
                            data-provinces="[['A Coruña','A Coruña'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almería'],['Asturias','Asturias Province'],['Badajoz','Badajoz'],['Balears','Balears Province'],['Barcelona','Barcelona'],['Burgos','Burgos'],['Cantabria','Cantabria Province'],['Castellón','Castellón'],['Ceuta','Ceuta'],['Ciudad Real','Ciudad Real'],['Cuenca','Cuenca'],['Cáceres','Cáceres'],['Cádiz','Cádiz'],['Córdoba','Córdoba'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Guipúzcoa','Gipuzkoa'],['Huelva','Huelva'],['Huesca','Huesca'],['Jaén','Jaén'],['La Rioja','La Rioja Province'],['Las Palmas','Las Palmas'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid Province'],['Melilla','Melilla'],['Murcia','Murcia'],['Málaga','Málaga'],['Navarra','Navarra'],['Ourense','Ourense'],['Palencia','Palencia'],['Pontevedra','Pontevedra'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa Cruz de Tenerife'],['Segovia','Segovia'],['Sevilla','Seville'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia'],['Valladolid','Valladolid'],['Vizcaya','Biscay'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Álava','Álava'],['Ávila','Ávila']]"
                          >
                            Spain
                          </option>
                          <option value="Sweden" data-provinces="[]">
                            Sweden
                          </option>
                          <option value="Switzerland" data-provinces="[]">
                            Switzerland
                          </option>
                          <option
                            value="United Arab Emirates"
                            data-provinces="[['Abu Dhabi','Abu Dhabi'],['Ajman','Ajman'],['Dubai','Dubai'],['Fujairah','Fujairah'],['Ras al-Khaimah','Ras al-Khaimah'],['Sharjah','Sharjah'],['Umm al-Quwain','Umm al-Quwain']]"
                          >
                            United Arab Emirates
                          </option>
                          <option
                            value="United Kingdom"
                            data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]"
                          >
                            United Kingdom
                          </option>
                          <option
                            value="United States"
                            data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]"
                          >
                            United States
                          </option>
                          <option value="Vietnam" data-provinces="[]">
                            Vietnam
                          </option>
                        </select>
                      </fieldset>
                      <fieldset className="field">
                        <label className="label">Zip code</label>
                        <input type="text" name="text" placeholder="" />
                      </fieldset>
                      <button className="tf-btn btn-fill animate-hover-btn radius-3 justify-content-center">
                        <span>Estimate</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="cart-checkbox">
                  <input
                    type="checkbox"
                    className="tf-check"
                    id="cart-gift-checkbox"
                  />
                  <label htmlFor="cart-gift-checkbox" className="fw-4">
                    <span>Do you want a gift wrap?</span> Only
                    <span className="fw-5">$5.00</span>
                  </label>
                </div> */}
                <div className="tf-cart-totals-discounts">
                  <h3>Subtotal</h3>
                  <span className="total-value">
                  ₹ {totalPrice.toFixed(2)}
                  </span>
                </div>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
