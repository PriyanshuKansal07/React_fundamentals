import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { createContext, useState, useEffect, useContext, useMemo, useCallback, useRef, useReducer, Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ----------------------- Context Example -----------------------
const AppContext = createContext();

// ----------------------- Reducer Example -----------------------
function counterReducer(state, action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    default:
      return state;
  }
}

// ----------------------- Lazy Loaded Component -----------------------
const LazyPage = lazy(() => import("./LazyPage.jsx").catch(() => ({ default: () => <h2>Error loading</h2> })));

// ----------------------- Dynamic Route Component -----------------------
function UserDetails() {
  const { id } = useParams();
  return <h3>User ID: {id}</h3>;
}

// ----------------------- Query String Example -----------------------
function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <input
        className="form-control w-50"
        placeholder="Search..."
        value={query}
        onChange={(e) => setParams({ q: e.target.value })}
      />
      <p className="mt-2">Query: {query}</p>
    </>
  );
}

// ----------------------- Nested Routes -----------------------
function Products() {
  return (
    <>
      <h3>Products Section</h3>
      <nav>
        <NavLink to="mobile" className="btn btn-info me-2">Mobiles</NavLink>
        <NavLink to="laptop" className="btn btn-info">Laptops</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

function Mobile() {
  return <h4>Mobile Products</h4>;
}

function Laptop() {
  return <h4>Laptop Products</h4>;
}

// ----------------------- Home Component (Hooks Example) -----------------------
function Home() {
  const [count, setCount] = useState(0);
  const [value, dispatch] = useReducer(counterReducer, 0);

  const inputRef = useRef(null);

  const expensiveCalc = useMemo(() => {
    return count * 10;
  }, [count]);

  const showAlert = useCallback(() => {
    alert("Button clicked!");
  }, []);

  const { message } = useContext(AppContext);

  useEffect(() => {
    document.title = "React Hooks Example";
  }, []);

  return (
    <div>
      <h3>React Hooks Overview</h3>

      <p><b>Context Value:</b> {message}</p>

      <div className="mt-3">
        <h5>useState Example</h5>
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>

      <div className="mt-3">
        <h5>useReducer Example</h5>
        <button className="btn btn-success me-1" onClick={() => dispatch({ type: "inc" })}>+</button>
        <button className="btn btn-danger me-3" onClick={() => dispatch({ type: "dec" })}>-</button>
        Value: {value}
      </div>

      <div className="mt-3">
        <h5>useRef Example</h5>
        <input ref={inputRef} className="form-control w-50" placeholder="Focus input" />
        <button className="btn btn-warning mt-2" onClick={() => inputRef.current.focus()}>
          Focus
        </button>
      </div>

      <div className="mt-3">
        <h5>useMemo Example</h5>
        <p>Expensive Result: {expensiveCalc}</p>
      </div>

      <div className="mt-3">
        <h5>useCallback Example</h5>
        <button className="btn btn-secondary" onClick={showAlert}>
          Show Alert
        </button>
      </div>
    </div>
  );
}

// ----------------------- Main App -----------------------
export default function App() {
  return (
    <AppContext.Provider value={{ message: "Hello from Context!" }}>
      <BrowserRouter>
        <div className="container mt-4">
          <nav className="mb-4">
            <Link to="/" className="btn btn-primary me-2">Home</Link>
            <NavLink to="/products" className="btn btn-info me-2">Products</NavLink>
            <NavLink to="/user/99" className="btn btn-success me-2">Dynamic Route</NavLink>
            <NavLink to="/search" className="btn btn-warning me-2">Query</NavLink>
            <NavLink to="/lazy" className="btn btn-dark">Lazy Load</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Nested Routes */}
            <Route path="products" element={<Products />}>
              <Route index element={<h4>Select a product category</h4>} />
              <Route path="mobile" element={<Mobile />} />
              <Route path="laptop" element={<Laptop />} />
            </Route>

            {/* Dynamic Route */}
            <Route path="user/:id" element={<UserDetails />} />

            {/* Query Strings */}
            <Route path="search" element={<SearchPage />} />

            {/* Lazy Load */}
            <Route
              path="lazy"
              element={
                <Suspense fallback={<h3>Loading component...</h3>}>
                  <LazyPage />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
