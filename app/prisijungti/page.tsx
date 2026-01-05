'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, login, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Prašome užpildyti visus laukus');
      console.warn("Validation failed: missing email or password");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa');
      console.warn("Validation failed: passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simbolių');
      console.warn("Validation failed: password too short");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        setSuccess('Sėkmingai prisijungėte!');
        // Redirect after successful login
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        await signup(email, password);
        setSuccess('Paskyra sėkmingai sukurta!');
        // Redirect after successful signup
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error("Authentication error:", err);

      if (err.code === 'auth/email-already-in-use') {
        setError('Šis el. paštas jau naudojamas');
      } else if (err.code === 'auth/invalid-email') {
        setError('Neteisingas el. pašto formatas');
      } else if (err.code === 'auth/user-not-found') {
        setError('Vartotojas nerastas');
      } else if (err.code === 'auth/wrong-password') {
        setError('Neteisingas slaptažodis');
      } else if (err.code === 'auth/weak-password') {
        setError('Slaptažodis per silpnas');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Neteisingi prisijungimo duomenys');
      } else {
        setError('Įvyko klaida. Bandykite dar kartą.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 overflow-hidden relative flex items-center justify-center p-6">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-[3rem] blur-3xl" />

        <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
              {isLogin ? 'Prisijungti' : 'Registruotis'}
            </h1>
            <p className="text-white/60">
              {isLogin ? 'Sveiki sugrįžę' : 'Sukurkite naują paskyrą'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-200 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                El. paštas
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="jusu@pastas.lt"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Slaptažodis
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Patvirtinkite slaptažodį
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/90 backdrop-blur-sm text-slate-900 py-4 rounded-2xl font-medium text-lg shadow-lg hover:bg-white hover:scale-105 transform transition-all duration-300 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Kraunama...' : isLogin ? 'Prisijungti' : 'Registruotis'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              {isLogin ? (
                <>
                  Neturite paskyros?{' '}
                  <span className="text-teal-300 font-medium">Registruokitės</span>
                </>
              ) : (
                <>
                  Jau turite paskyrą?{' '}
                  <span className="text-teal-300 font-medium">Prisijunkite</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}