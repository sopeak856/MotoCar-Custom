<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
    <div class="max-w-2xl w-full bg-[#12161f] border border-gray-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      <!-- Glow ambient background -->
      <div class="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Top Header Brand & Icon -->
      <div class="text-center space-y-2 border-b border-gray-800/80 pb-6 relative z-10">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Flame class="w-4 h-4 text-red-500" />
          <span>MotoCar Custom Authentication Center</span>
        </div>

        <h1 class="text-3xl font-black text-white uppercase tracking-tight font-sans">
          MOTO<span class="text-red-500">CAR</span> CUSTOM
        </h1>
        <p class="text-xs text-gray-400 max-w-md mx-auto">
          Sign in to track orders, manage your garage rides, or register your tuning workshop for wholesale bulk dealer pricing.
        </p>

        <!-- Main Mode Tabs: 1. Sign In | 2. B2C Register | 3. B2B Wholesale -->
        <div class="grid grid-cols-3 gap-2 pt-4">
          <button 
            type="button"
            @click="activeScreen = 'login'; resetErrors()"
            class="py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            :class="activeScreen === 'login' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-900 text-gray-400 hover:text-white border border-gray-800'"
          >
            <LogIn class="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button 
            type="button"
            @click="activeScreen = 'register-b2c'; resetErrors()"
            class="py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            :class="activeScreen === 'register-b2c' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-900 text-gray-400 hover:text-white border border-gray-800'"
          >
            <UserPlus class="w-4 h-4" />
            <span>B2C Register</span>
          </button>

          <button 
            type="button"
            @click="activeScreen = 'register-b2b'; resetErrors()"
            class="py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            :class="activeScreen === 'register-b2b' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 font-black' : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'"
          >
            <Building2 class="w-4 h-4" />
            <span>B2B Wholesale</span>
          </button>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- SCREEN 1: SIGN IN / LOGIN -->
      <!-- ============================================== -->
      <div v-if="activeScreen === 'login'" class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-white uppercase tracking-wider">Welcome Back</h2>
          <span class="text-xs text-gray-400">Retail & Garage Wholesale Accounts</span>
        </div>

        <form @submit.prevent="handleLoginSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Email or Phone Number</label>
            <div class="relative">
              <input 
                v-model="loginData.identifier"
                type="text" 
                required
                placeholder="sokha.rithy@garage-apex.kh or +855 12 888 999"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              />
              <Mail class="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-bold uppercase text-gray-400">Password</label>
              <button 
                type="button"
                @click="activeScreen = 'forgot'"
                class="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div class="relative">
              <input 
                v-model="loginData.password"
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="••••••••••••"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
              <Lock class="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-gray-400">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" v-model="loginData.remember" class="rounded bg-zinc-800 border-gray-700 text-red-600 focus:ring-red-500 w-4 h-4" />
              <span>Remember this device</span>
            </label>
            <span class="text-emerald-400 font-medium">Secured with 256-bit SSL</span>
          </div>

          <button 
            type="submit"
            class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <LogIn class="w-4 h-4" />
            <span>Sign In to Your Account</span>
          </button>
        </form>

        <!-- Social Login Simulation -->
        <div class="pt-4 border-t border-gray-800 text-center space-y-3">
          <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Fast 1-Click Cambodian Authentication</div>
          <div class="grid grid-cols-2 gap-3">
            <button 
              type="button"
              @click="simulateSocialLogin('Telegram')"
              class="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-sky-400 hover:text-sky-300 text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Send class="w-4 h-4 text-sky-400" />
              <span>Telegram 1-Click</span>
            </button>

            <button 
              type="button"
              @click="simulateSocialLogin('Google')"
              class="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-gray-800 text-gray-200 hover:text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Globe class="w-4 h-4 text-red-400" />
              <span>Google Account</span>
            </button>
          </div>
        </div>

        <div class="text-center text-xs text-gray-400 pt-2">
          Don't have an account yet? 
          <button @click="activeScreen = 'register-b2c'" class="text-red-400 font-bold hover:underline cursor-pointer ml-1">
            Create B2C Account
          </button>
          or
          <button @click="activeScreen = 'register-b2b'" class="text-amber-400 font-bold hover:underline cursor-pointer ml-1">
            Join Wholesale Partner
          </button>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- SCREEN 2: B2C RETAIL CUSTOMER REGISTER -->
      <!-- ============================================== -->
      <div v-else-if="activeScreen === 'register-b2c'" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-white uppercase tracking-wider">Create Retail Customer Account</h2>
            <p class="text-xs text-gray-400">Save your vehicles, track shipments, and receive promotional discounts.</p>
          </div>
        </div>

        <form @submit.prevent="handleB2CRegisterSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
              <input 
                v-model="b2cForm.name"
                type="text" 
                required
                placeholder="e.g. Sokha Rithy"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number (+855)</label>
              <input 
                v-model="b2cForm.phone"
                type="text" 
                required
                placeholder="+855 12 888 999"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Email Address</label>
              <input 
                v-model="b2cForm.email"
                type="email" 
                required
                placeholder="name@domain.com"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Telegram Handle</label>
              <input 
                v-model="b2cForm.telegram"
                type="text" 
                placeholder="@username (optional for order alerts)"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Password</label>
              <input 
                v-model="b2cForm.password"
                type="password" 
                required
                placeholder="At least 6 characters"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Confirm Password</label>
              <input 
                v-model="b2cForm.confirmPassword"
                type="password" 
                required
                placeholder="Re-enter password"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="flex items-center space-x-2 pt-1 text-xs text-gray-400">
            <input type="checkbox" id="terms" required class="rounded bg-zinc-800 border-gray-700 text-red-600 focus:ring-red-500 w-4 h-4" />
            <label for="terms" class="cursor-pointer">
              I agree to the <a href="#" class="text-red-400 hover:underline">Terms of Service</a> and Cambodian GDT warranty policy.
            </label>
          </div>

          <button 
            type="submit"
            class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Create Customer Account
          </button>
        </form>

        <div class="text-center text-xs text-gray-400">
          Already have an account? 
          <button @click="activeScreen = 'login'" class="text-red-400 font-bold hover:underline cursor-pointer ml-1">
            Sign In here
          </button>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- SCREEN 3: B2B WHOLESALE REGISTRATION & APPROVAL -->
      <!-- ============================================== -->
      <div v-else-if="activeScreen === 'register-b2b'" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-black text-amber-300 uppercase tracking-wider flex items-center space-x-2">
              <Building2 class="w-5 h-5 text-amber-400" />
              <span>B2B Wholesale Garage & Dealer Application</span>
            </h2>
            <p class="text-xs text-gray-400 mt-0.5">
              Unlock Tier 1 bulk wholesale prices, Net 30 days credit line, and official tax invoices.
            </p>
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
          <div class="font-bold flex items-center space-x-1.5">
            <CheckCircle2 class="w-4 h-4 text-amber-400" />
            <span>Instant Wholesale Approval Available</span>
          </div>
          <div class="text-[11px] text-gray-300">
            Registered Cambodian workshops receive up to $25,000 credit line with 15-35% wholesale discounts.
          </div>
        </div>

        <form @submit.prevent="handleB2BRegisterSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Company / Workshop Name</label>
              <input 
                v-model="b2bForm.companyName" 
                type="text" 
                required
                placeholder="e.g. Apex Motor Tuning Co., Ltd"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Cambodia Tax Patent / TIN</label>
              <input 
                v-model="b2bForm.companyTin" 
                type="text" 
                required
                placeholder="K009-882739102"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Ministry of Commerce License</label>
              <input 
                v-model="b2bForm.garageLicense" 
                type="text" 
                required
                placeholder="MOC-GAR-2024-9912"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Business Nature</label>
              <select 
                v-model="b2bForm.businessType"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Tuning Garage & Speed Shop">Tuning Garage & Speed Shop</option>
                <option value="Authorized 4S Car Dealership">Authorized 4S Car Dealership</option>
                <option value="Superbike & Motorcycle Performance Center">Superbike Performance Center</option>
                <option value="Aftermarket Wholesaler & Importer">Aftermarket Wholesaler & Importer</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Hydraulic Lifts Count</label>
              <input 
                v-model.number="b2bForm.lifts" 
                type="number" 
                min="1"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Expected Monthly Volume ($)</label>
              <select 
                v-model="b2bForm.monthlyVolume"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="$2,000 - $5,000">$2,000 - $5,000 / month</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000 / month</option>
                <option value="$15,000 - $50,000+">$15,000 - $50,000+ / month (Tier 1 Preferred)</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Physical Workshop Address</label>
              <input 
                v-model="b2bForm.address"
                type="text" 
                required
                placeholder="Street 315, Khan Tuol Kork, Phnom Penh"
                class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <!-- Simulated Patent / License File Upload -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Upload Business Patent / Garage Photo</label>
              <div class="border-2 border-dashed border-gray-700 hover:border-amber-500/50 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-zinc-900/50">
                <FileCheck class="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <span class="text-xs text-gray-300 font-semibold">Drop Ministry Patent or Click to Browse</span>
                <span class="text-[10px] text-gray-500 block">PDF, PNG, JPG up to 10MB (Official verification)</span>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <ShieldCheck class="w-4 h-4 text-black" />
            <span>Submit Wholesale Application & Unlock Credit Line</span>
          </button>
        </form>

        <div class="text-center text-xs text-gray-400">
          Already registered? 
          <button @click="activeScreen = 'login'" class="text-amber-400 font-bold hover:underline cursor-pointer ml-1">
            Sign In here
          </button>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- SCREEN 4: FORGOT PASSWORD FLOW -->
      <!-- ============================================== -->
      <div v-else-if="activeScreen === 'forgot'" class="space-y-6">
        <div class="space-y-1">
          <button @click="activeScreen = 'login'" class="text-xs text-gray-400 hover:text-white flex items-center space-x-1 mb-2">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>
          <h2 class="text-base font-bold text-white uppercase tracking-wider">Reset Your Password</h2>
          <p class="text-xs text-gray-400">
            {{ forgotStep === 1 ? 'Enter your registered phone or email to receive a verification OTP.' : forgotStep === 2 ? 'Enter the 6-digit OTP code sent to your Telegram or SMS.' : 'Enter your new strong password.' }}
          </p>
        </div>

        <!-- Step 1: Input Identifier -->
        <div v-if="forgotStep === 1" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number or Email</label>
            <input 
              v-model="forgotIdentifier"
              type="text" 
              required
              placeholder="sokha.rithy@garage-apex.kh or +855 12 888 999"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button 
            type="button"
            @click="sendOtp"
            class="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Send 6-Digit OTP Code
          </button>
        </div>

        <!-- Step 2: OTP Verification -->
        <div v-else-if="forgotStep === 2" class="space-y-4">
          <div class="p-3 bg-red-600/10 border border-red-500/30 rounded-xl text-xs text-red-300">
            Simulated OTP sent to <span class="font-mono font-bold">{{ forgotIdentifier }}</span>: <span class="font-bold underline">889922</span>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">6-Digit Verification Code</label>
            <input 
              v-model="otpCode"
              type="text" 
              maxlength="6"
              placeholder="889922"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button 
            type="button"
            @click="verifyOtp"
            class="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Verify OTP Code
          </button>
        </div>

        <!-- Step 3: New Password -->
        <div v-else-if="forgotStep === 3" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">New Password</label>
            <input 
              v-model="newPassword"
              type="password" 
              required
              placeholder="At least 6 characters"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Confirm New Password</label>
            <input 
              v-model="confirmNewPassword"
              type="password" 
              required
              placeholder="Re-type new password"
              class="w-full bg-zinc-900 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button 
            type="button"
            @click="finishReset"
            class="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            Reset Password & Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  Flame, LogIn, UserPlus, Building2, Mail, Lock, Eye, EyeOff, 
  Send, Globe, CheckCircle2, ShieldCheck, FileCheck, ArrowLeft 
} from '@lucide/vue';
import { useUserStore } from '../stores/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// 'login' | 'register-b2c' | 'register-b2b' | 'forgot'
const activeScreen = ref('login');
const showPassword = ref(false);

// Forms
const loginData = reactive({
  identifier: userStore.user.email,
  password: 'password123',
  remember: true
});

const b2cForm = reactive({
  name: 'Sokha Rithy',
  phone: '+855 12 888 999',
  email: 'sokha.rithy@garage-apex.kh',
  telegram: '@sokharithy_kh',
  password: 'password123',
  confirmPassword: 'password123'
});

const b2bForm = reactive({
  companyName: 'Apex Motor Tuning Co., Ltd',
  companyTin: 'K009-882739102',
  garageLicense: 'MOC-GAR-2024-9912',
  businessType: 'Tuning Garage & Speed Shop',
  lifts: 6,
  monthlyVolume: '$15,000 - $50,000+ (Tier 1 Preferred)',
  address: 'Street 315, Khan Tuol Kork, Phnom Penh'
});

// Forgot Password Flow
const forgotStep = ref(1);
const forgotIdentifier = ref(userStore.user.email);
const otpCode = ref('889922');
const newPassword = ref('');
const confirmNewPassword = ref('');

onMounted(() => {
  if (route.query.mode === 'b2b') {
    activeScreen.value = 'register-b2b';
  } else if (route.query.mode === 'register') {
    activeScreen.value = 'register-b2c';
  } else if (route.query.mode === 'forgot') {
    activeScreen.value = 'forgot';
  }
});

function resetErrors() {
  forgotStep.value = 1;
}

function handleLoginSubmit() {
  userStore.login({ identifier: loginData.identifier });
  router.push('/account');
}

function handleB2CRegisterSubmit() {
  if (b2cForm.password !== b2cForm.confirmPassword) {
    alert('Passwords do not match. Please re-enter.');
    return;
  }
  userStore.registerB2C(b2cForm);
  alert('Customer Account created successfully! Welcome to MotoCar Custom.');
  router.push('/account');
}

function handleB2BRegisterSubmit() {
  userStore.registerB2B(b2bForm);
  alert('🎉 Congratulations! Your B2B Wholesale Garage Account has been approved with a $25,000 Net-30 credit line.');
  router.push('/shop?b2bOnly=true');
}

function simulateSocialLogin(provider) {
  userStore.login({ identifier: `user.${provider.toLowerCase()}@motocar.kh` });
  alert(`Successfully signed in via ${provider}!`);
  router.push('/account');
}

function sendOtp() {
  if (!forgotIdentifier.value) return;
  forgotStep.value = 2;
}

function verifyOtp() {
  if (otpCode.value.trim() !== '889922') {
    alert('Invalid OTP code. Please use simulated code 889922.');
    return;
  }
  forgotStep.value = 3;
}

function finishReset() {
  if (!newPassword.value || newPassword.value !== confirmNewPassword.value) {
    alert('Please confirm your new password properly.');
    return;
  }
  userStore.login({ identifier: forgotIdentifier.value });
  alert('Password has been reset successfully! You are now logged in.');
  router.push('/account');
}
</script>
