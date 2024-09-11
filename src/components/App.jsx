import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../blocks/app.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";
import ProtectedRoute from "./ProtectedRoute";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { coordinates, APIkey } from "../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import {
  registerUser,
  signInUser,
  updateUser,
  isValidToken,
} from "../utils/auth";
import { getToken, setToken } from "../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 86, C: 86 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [protectedDestination, setProtectedDestination] = useState("/profile");

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleSubmit = (request) => {
    request().then(closeActiveModal).catch(console.error);
  };
  /*const handleAddItemSubmit = (item, resetForm) => {
    postItems(item.name, item.imageUrl, item.weather)
      .then((freshCard) => {
        setClothingItems([freshCard, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => console.error("Error during submit:", error));
  }; */

  const handleAddItemSubmit = (newItem, resetCurrentForm) => {
    const token = getToken();

    const startRequest = () => {
      return addItem(newItem, token).then((res) => {
        setClothingItems([...clothingItems, res.data]);
        resetCurrentForm();
        closeActiveModal();
      });
    };
    handleSubmit(startRequest);
  };

  const handleDeleteItem = () => {
    const token = getToken();

    const startRequest = () => {
      return deleteItem(selectedCard._id, token).then(() =>
        setClothingItems((prevItem) =>
          prevItem.filter((item) => item._id !== selectedCard._id)
        )
      );
    };
    handleSubmit(startRequest);
  };

  /*const handleDeleteItem = (item) => {
    deleteItems(item)
      .then((res) => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== item._id
        );
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch((e) => console.error(e));
  }; */

  const handleRegisterUser = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    registerUser({
      email,
      password,
      name,
      avatar,
    })
      .then((res) => {
        setIsloggedIn(true);
        setCurrentUser(res.data);
        console.log(res);
        navigate("/profile");
        closeActiveModal();
      })
      .catch((res) => {
        console.error(res);
        console.log(res);
      });
  };

  const handleLoginUser = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    signInUser({ email, password })
      .then((res) => {
        setToken(res.token);
        return isValidToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsloggedIn(true);
        closeActiveModal();
        navigate(protectedDestination || "/");
      })
      .catch((err) => {
        console.error("Wrong Login information", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsloggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleRegisterOrLogin = () => {
    activeModal === "login" ? handleRegisterUser() : handleLoginUser();
  };

  const handleEditProfileUser = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const token = getToken();

    const updateClothingItems = (newCard) => (cards) => {
      return cards.map((item) => (item._id === id ? newCard : item));
    };

    if (!isLiked) {
      addCardLike(id, token)
        .then((newCard) => {
          setClothingItems(updateClothingItems(newCard.item));
        })
        .catch(console.error);
    } else if (isLiked) {
      removeCardLike(id, token)
        .then((newCard) => {
          setClothingItems(updateClothingItems(newCard.item));
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    isValidToken(token)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsloggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginUser={handleLoginUser}
              handleRegisterUser={handleRegisterUser}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileUser={handleEditProfileUser}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />

          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteItem={handleDeleteItem}
            />
          )}
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            handleToggleRegisterOrLogin={handleToggleRegisterOrLogin}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            handleToggleRegisterOrLogin={handleToggleRegisterOrLogin}
          />

          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
