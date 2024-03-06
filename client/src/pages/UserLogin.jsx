// ... (other imports)
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function loginUser(ev) {
    ev.preventDefault();
  
    if (email === '' || password === '') {
      toast.error('Please fill all fields');
    } else {
      try {
        const response = await axios.post('http://localhost:4004/login', {
          email,
          password,
        });
  
        if (response.ok) {
          const data = await response.json();
          const userRole = data.role || 'Client'; // Default to 'Client' if no role found
  
          console.log('Received role:', userRole); // Log the received role
  
          switch (userRole.toLowerCase()) {
            case 'admin':
              navigate('/admin/dashboard');
              break;
            case 'client':
              navigate('/client/dashboard');
              break;
            case 'auditor':
              navigate('/auditor/dashboard');
              break;
            case 'projectmanager':
              navigate('/projectmanager/dashboard');
              break;
            default:
              toast.error('Invalid role');
          }
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (err) {
        toast.error('An error occurred during login.');
        console.error(err);
      }
    }
  }
  
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 border border-gray-300 rounded">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded w-full text-lg"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded w-full text-lg"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <Link to="/forgot-password" className="text-blue-500">
          Forgot password?
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
