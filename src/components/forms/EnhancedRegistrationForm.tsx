import { useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { storeTypes, productSuggestions } from '@/data/mockRetailers';
import { Retailer, StoreType } from '@/types/retailer';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const T = {
  bg: '#F0EFED',
  bgWhite: '#ffffff',
  bgCard: '#E8E7E4',
  textDark: '#111111',
  textMid: '#555555',
  textLight: '#999999',
  border: 'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  gold: '#FFB800',
  goldSoft: 'rgba(255,184,0,0.12)',
  goldBorder: 'rgba(255,184,0,0.35)',
  error: '#DC2626',
  errorSoft: 'rgba(220,38,38,0.08)',
  success: '#15803D',
  successSoft: 'rgba(34,197,94,0.1)',
  font: "'DM Sans', sans-serif",
};

type RegistrationFormData = {
  storeName: string;
  gstNumber: string;
  businessRegistrationNumber: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  storeType: StoreType | '';
  products: string[];
  monthlyBudget: string;
  yearEstablished: string;
  numberOfEmployees: string;
  storeFrontPhoto: string;
};

export function EnhancedRegistrationForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<RegistrationFormData>({
    storeName: '',
    gstNumber: '',
    businessRegistrationNumber: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    storeType: '' as StoreType | '',
    products: [] as string[],
    monthlyBudget: '',
    yearEstablished: '',
    numberOfEmployees: '',
    storeFrontPhoto: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateGST = (v: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^[6-9]\d{9}$/.test(v);
  const validatePincode = (v: string) => /^[1-9][0-9]{5}$/.test(v);

  const handleChange = <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!formData.storeName.trim()) e.storeName = 'Store name is required';
      if (!formData.gstNumber.trim()) e.gstNumber = 'GST number is required';
      else if (!validateGST(formData.gstNumber)) e.gstNumber = 'Invalid GST format (e.g., 22AAAAA0000A1Z5)';
      if (!formData.ownerName.trim()) e.ownerName = 'Owner name is required';
    }
    if (step === 2) {
      if (!formData.email.trim()) e.email = 'Email is required';
      else if (!validateEmail(formData.email)) e.email = 'Invalid email format';
      if (!formData.phone.trim()) e.phone = 'Phone number is required';
      else if (!validatePhone(formData.phone)) e.phone = 'Invalid phone (10 digits starting with 6-9)';
      if (!formData.address.trim()) e.address = 'Address is required';
      if (!formData.city.trim()) e.city = 'City is required';
      if (!formData.pincode.trim()) e.pincode = 'Pincode is required';
      else if (!validatePincode(formData.pincode)) e.pincode = 'Invalid pincode format';
    }
    if (step === 3) {
      if (!formData.storeType) e.storeType = 'Store type is required';
      if (formData.products.length < 3) e.products = 'Select at least 3 products';
      if (!formData.monthlyBudget || Number(formData.monthlyBudget) <= 0) e.monthlyBudget = 'Valid monthly budget is required';
      if (!formData.yearEstablished || Number(formData.yearEstablished) < 1900) e.yearEstablished = 'Valid year is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((p) => p + 1);
    else toast.error('Please fix the errors before continuing');
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    const newRetailer: Retailer = {
      id: `r_${Date.now()}`,
      storeName: formData.storeName,
      storeType: formData.storeType as StoreType,
      gstNumber: formData.gstNumber,
      businessRegistrationNumber: formData.businessRegistrationNumber || undefined,
      ownerName: formData.ownerName,
      email: formData.email,
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        coordinates: {
          lat: 12.9716 + (Math.random() - 0.5) * 0.1,
          lng: 77.5946 + (Math.random() - 0.5) * 0.1,
        },
      },
      products: formData.products,
      monthlyBudget: Number(formData.monthlyBudget),
      phone: formData.phone,
      verificationStatus: 'pending',
      yearEstablished: Number(formData.yearEstablished),
      numberOfEmployees: Number(formData.numberOfEmployees) || 1,
      storeFrontPhoto: formData.storeFrontPhoto || undefined,
      joinedDate: new Date().toISOString(),
      languagePreference: (localStorage.getItem('bulqit_language') ?? 'en'),
    };

    // Persist user in auth/storage so dashboard route guard passes.
    login(newRetailer);
    setIsSubmitting(false);
    toast.success('Registration submitted!', {
      description: 'Your account is under verification. You can start browsing groups.',
    });
    navigate('/dashboard');
  };

  const steps = [
    { num: 1, label: 'Verification' },
    { num: 2, label: 'Contact' },
    { num: 3, label: 'Business' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: T.font,
        backgroundColor: T.bg,
        backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        color: T.textDark,
        padding: '80px 24px 60px',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: T.textDark,
                marginBottom: 20,
              }}
            >
              Bulqit
            </div>
          </a>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.035em', marginBottom: 10 }}>
            Register your store
          </h1>
          <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.6 }}>
            Join hundreds of retailers saving 15-40% every month.
          </p>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 14 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    background: currentStep > s.num ? T.textDark : currentStep === s.num ? T.gold : T.bgCard,
                    color: currentStep >= s.num ? (currentStep === s.num ? '#000' : '#fff') : T.textLight,
                    border: currentStep === s.num ? `2px solid ${T.gold}` : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    boxShadow: currentStep === s.num ? `0 0 0 4px ${T.goldSoft}` : 'none',
                  }}
                >
                  {currentStep > s.num ? <CheckCircle size={18} /> : s.num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: 80,
                      height: 2,
                      background: currentStep > s.num ? T.textDark : T.borderDash,
                      transition: 'background 0.3s ease',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8 }}>
            {steps.map((s) => (
              <span
                key={s.num}
                style={{
                  fontSize: 12,
                  fontWeight: currentStep === s.num ? 700 : 500,
                  color: currentStep >= s.num ? T.textDark : T.textLight,
                  letterSpacing: '0.02em',
                  width: 80,
                  textAlign: 'center',
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            background: T.bgWhite,
            border: `1px solid ${T.border}`,
            borderRadius: 20,
            padding: '44px 48px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {currentStep === 1 && (
            <div>
              <StepHeader title="Business Verification" sub="We verify all retailers to ensure a trusted marketplace" />

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  background: 'rgba(100,116,240,0.06)',
                  border: '1px solid rgba(100,116,240,0.18)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 28,
                }}
              >
                <Info size={16} color="#6474F0" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: '#3D4FD6', marginBottom: 3 }}>Demo Mode</div>
                  <div style={{ color: T.textMid }}>
                    For testing: Use{' '}
                    <code style={{ background: 'rgba(100,116,240,0.1)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>
                      22AAAAA0000A1Z5
                    </code>{' '}
                    as GST number
                  </div>
                </div>
              </div>

              <Field label="Store Name" required error={errors.storeName}>
                <StyledInput
                  placeholder="e.g., Rajesh Medical Store"
                  value={formData.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  hasError={!!errors.storeName}
                />
              </Field>

              <Field label="GST Number" required error={errors.gstNumber} hint="Format: 22AAAAA0000A1Z5 (15 characters)">
                <StyledInput
                  placeholder="e.g., 29ABCDE1234F1Z5"
                  value={formData.gstNumber}
                  onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
                  maxLength={15}
                  hasError={!!errors.gstNumber}
                />
              </Field>

              <Field label="Business Registration Number" hint="Optional">
                <StyledInput
                  placeholder="e.g., U12345KA2020PTC123456"
                  value={formData.businessRegistrationNumber}
                  onChange={(e) => handleChange('businessRegistrationNumber', e.target.value)}
                />
              </Field>

              <Field label="Owner Name" required error={errors.ownerName}>
                <StyledInput
                  placeholder="e.g., Rajesh Kumar"
                  value={formData.ownerName}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  hasError={!!errors.ownerName}
                />
              </Field>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <StepHeader title="Contact & Location" sub="Where can suppliers and partners reach you?" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Email" required error={errors.email}>
                  <StyledInput
                    type="email"
                    placeholder="rajesh@store.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    hasError={!!errors.email}
                  />
                </Field>
                <Field label="Phone Number" required error={errors.phone}>
                  <StyledInput
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    maxLength={10}
                    hasError={!!errors.phone}
                  />
                </Field>
              </div>

              <Field label="Store Address" required error={errors.address}>
                <Textarea
                  placeholder="Shop No. 123, Main Road, Jayanagar 4th Block"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    fontFamily: T.font,
                    fontSize: 14,
                    padding: '10px 14px',
                    borderRadius: 10,
                    resize: 'none',
                    border: `1px solid ${errors.address ? T.error : T.border}`,
                    background: T.bg,
                    color: T.textDark,
                    outline: 'none',
                  }}
                />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <Field label="City" required error={errors.city}>
                  <StyledInput
                    placeholder="Bengaluru"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    hasError={!!errors.city}
                  />
                </Field>
                <Field label="State">
                  <StyledInput value={formData.state} disabled />
                </Field>
                <Field label="Pincode" required error={errors.pincode}>
                  <StyledInput
                    placeholder="560041"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    maxLength={6}
                    hasError={!!errors.pincode}
                  />
                </Field>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <StepHeader title="Business Details" sub="Help us match you with the right buying groups" />

              <Field label="Store Type" required error={errors.storeType}>
                <Select
                  value={formData.storeType}
                  onValueChange={(value) => {
                    handleChange('storeType', value);
                    if (productSuggestions[value as StoreType]) handleChange('products', []);
                  }}
                >
                  <SelectTrigger
                    style={{
                      width: '100%',
                      fontFamily: T.font,
                      fontSize: 14,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: `1px solid ${errors.storeType ? T.error : T.border}`,
                      background: T.bg,
                      color: T.textDark,
                    }}
                  >
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>
                    {storeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.storeType && <FieldError msg={errors.storeType} />}
              </Field>

              {formData.storeType && (
                <Field
                  label="Products You Sell"
                  required
                  error={errors.products}
                  hint={`${formData.products.length} selected - choose at least 3`}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                    {productSuggestions[formData.storeType as StoreType]?.map((product) => {
                      const selected = formData.products.includes(product);
                      return (
                        <button
                          key={product}
                          onClick={() => {
                            handleChange(
                              'products',
                              selected ? formData.products.filter((p) => p !== product) : [...formData.products, product],
                            );
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '6px 14px',
                            borderRadius: 100,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: T.font,
                            background: selected ? T.textDark : T.bgCard,
                            color: selected ? '#fff' : T.textMid,
                            border: selected ? `1px solid ${T.textDark}` : `1px solid ${T.border}`,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {selected && <CheckCircle size={12} />}
                          {product}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Monthly Purchase Budget (INR)" required error={errors.monthlyBudget}>
                  <StyledInput
                    type="number"
                    placeholder="100000"
                    value={formData.monthlyBudget}
                    onChange={(e) => handleChange('monthlyBudget', e.target.value)}
                    hasError={!!errors.monthlyBudget}
                  />
                </Field>
                <Field label="Year Established" required error={errors.yearEstablished}>
                  <StyledInput
                    type="number"
                    placeholder="2015"
                    value={formData.yearEstablished}
                    onChange={(e) => handleChange('yearEstablished', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                    hasError={!!errors.yearEstablished}
                  />
                </Field>
              </div>

              <Field label="Number of Employees" hint="Optional">
                <StyledInput
                  type="number"
                  placeholder="5"
                  value={formData.numberOfEmployees}
                  onChange={(e) => handleChange('numberOfEmployees', e.target.value)}
                  min="1"
                />
              </Field>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 36,
              paddingTop: 28,
              borderTop: `1px dashed ${T.borderDash}`,
            }}
          >
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((p) => p - 1)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  background: 'transparent',
                  color: T.textMid,
                  border: `1px solid ${T.border}`,
                  cursor: 'pointer',
                  fontFamily: T.font,
                }}
              >
                <ArrowLeft size={15} /> Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 28px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: T.textDark,
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                Next <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 28px',
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: isSubmitting ? T.textLight : T.gold,
                  color: '#000',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontFamily: T.font,
                  boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(255,184,0,0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: '2px solid rgba(0,0,0,0.2)',
                        borderTopColor: '#000',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                        display: 'inline-block',
                      }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    {' '}
                    Complete Registration <CheckCircle size={15} />{' '}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: T.textLight, marginTop: 24 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: T.textDark, fontWeight: 600, textDecoration: 'none' }}>
            Sign in {'->'}
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, textarea:focus { outline: none !important; border-color: #111 !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.06) !important; }
        input:disabled { opacity: 0.5; cursor: not-allowed; }
        button:not(:disabled):hover { opacity: 0.88; }
      `}</style>
    </div>
  );
}

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 6 }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.55 }}>{sub}</p>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
          {label}
          {required && <span style={{ color: '#FFB800', marginLeft: 3 }}>*</span>}
        </label>
        {hint && !error && <span style={{ fontSize: 11, color: '#999', fontWeight: 400 }}>{hint}</span>}
      </div>
      {children}
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
      <AlertCircle size={13} color="#DC2626" />
      <span style={{ fontSize: 12, color: '#DC2626' }}>{msg}</span>
    </div>
  );
}

function StyledInput({
  hasError = false,
  disabled = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      {...props}
      disabled={disabled}
      style={{
        width: '100%',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        padding: '10px 14px',
        borderRadius: 10,
        border: `1px solid ${hasError ? '#DC2626' : 'rgba(0,0,0,0.08)'}`,
        background: disabled ? 'rgba(0,0,0,0.03)' : '#F0EFED',
        color: '#111',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        ...props.style,
      }}
    />
  );
}
