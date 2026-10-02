import { useState, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from 'react';
import { Phone, CheckCircle2, Clock, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface BookingSectionProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export function BookingSection({ selectedService, onServiceChange }: BookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('ASAP / Soonest Available');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dispatchCode, setDispatchCode] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Phone input formatting: (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validateField = (fieldName: string, value: string): string | undefined => {
    if (fieldName === 'name') {
      const trimmed = value.trim();
      if (!trimmed) return 'Name is required';
      if (trimmed.length < 2) return 'Please enter your full name (at least 2 characters)';
      if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name contains invalid characters';
      return undefined;
    }

    if (fieldName === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (!digits) return 'Phone number is required for dispatch confirmation';
      if (digits.length < 10) return 'Please enter a valid 10-digit phone number';
      return undefined;
    }

    if (fieldName === 'address') {
      const trimmed = value.trim();
      if (!trimmed) return 'Service address is required';
      if (trimmed.length < 5) return 'Please enter a valid street address (e.g. 930 Cedar St)';
      return undefined;
    }

    return undefined;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateField('name', val) }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validateField('phone', formatted) }));
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);
    if (touched.address) {
      setErrors((prev) => ({ ...prev, address: validateField('address', val) }));
    }
  };

  const handleBlur = (field: 'name' | 'phone' | 'address') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'name') val = name;
    if (field === 'phone') val = phone;
    if (field === 'address') val = address;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, phone: true, address: true });

    const nameErr = validateField('name', name);
    const phoneErr = validateField('phone', phone);
    const addressErr = validateField('address', address);

    const newErrors: FormErrors = {
      name: nameErr,
      phone: phoneErr,
      address: addressErr,
    };

    setErrors(newErrors);

    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (phoneErr) {
      phoneInputRef.current?.focus();
      return;
    }
    if (addressErr) {
      addressInputRef.current?.focus();
      return;
    }

    // Success flow
    const code = 'RB-' + Math.floor(100000 + Math.random() * 900000);
    setDispatchCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setTouched({});
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="booking" className="relative w-full py-28 sm:py-36 md:py-44 bg-white text-[#0a0a0a] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Direct Contact */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-400 uppercase font-medium">
                Booking & Dispatch
              </span>
              <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0a0a0a] leading-[1.06] text-balance">
                Schedule service.<br />
                Get it handled.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Submit your request below for residential or commercial plumbing in Santa Ana. A technician will review your request and confirm your dispatch window.
            </p>

            {/* Direct Telephone Card */}
            <div className="p-5 sm:p-6 rounded-[12px] border border-neutral-200 bg-neutral-50/70 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Direct Emergency Line
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Active burst pipe, sewer backup, or urgent gas line shutoff? Call our dispatch desk directly.
              </p>
              <div className="pt-1">
                <a
                  href="tel:6573002460"
                  className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-medium text-neutral-900 hover:text-black hover:underline transition-all"
                  data-cursor-cta="true"
                >
                  <Phone className="w-4 h-4 text-neutral-700" />
                  <span>(657) 300-2460</span>
                </a>
              </div>
            </div>

            {/* Trust Points */}
            <div className="pt-2 space-y-3 font-mono text-xs text-neutral-500">
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Same-day and advance scheduled windows</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Upfront inspection and clear pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Booking Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
              <div className="p-7 sm:p-10 md:p-12 rounded-[16px] border border-[#e5e7eb] bg-white shadow-xs">
                <div className="border-b border-neutral-100 pb-5 mb-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                    Dispatch Request Form
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900">
                    Book Plumbing Service
                  </h3>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Service Selection Tabs */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                      Selected Service *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'PLUMBING REPAIR', label: 'Plumbing Repair' },
                        { id: 'WATER HEATERS', label: 'Water Heaters' },
                        { id: 'DRAINS & SEWER', label: 'Drains & Sewer' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onServiceChange(item.id)}
                          className={`py-3 px-3 text-xs font-mono tracking-wide rounded-md border text-center transition-all ${
                            selectedService === item.id
                              ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                              : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                          }`}
                          data-cursor-cta="true"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. Eleanor Vance"
                        aria-invalid={Boolean(touched.name && errors.name)}
                        className={`w-full px-4 py-3 border rounded-md text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                          touched.name && errors.name
                            ? 'bg-red-50/20 border-red-400 focus:border-red-500'
                            : 'bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:bg-white'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="font-mono text-[11px] text-red-600 mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={() => handleBlur('phone')}
                        placeholder="(657) 000-0000"
                        aria-invalid={Boolean(touched.phone && errors.phone)}
                        className={`w-full px-4 py-3 border rounded-md text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                          touched.phone && errors.phone
                            ? 'bg-red-50/20 border-red-400 focus:border-red-500'
                            : 'bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:bg-white'
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="font-mono text-[11px] text-red-600 mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Address */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Service Address (Santa Ana / Orange County) *
                    </label>
                    <input
                      ref={addressInputRef}
                      type="text"
                      value={address}
                      onChange={handleAddressChange}
                      onBlur={() => handleBlur('address')}
                      placeholder="Street address or neighborhood (e.g. 930 Cedar St)"
                      aria-invalid={Boolean(touched.address && errors.address)}
                      className={`w-full px-4 py-3 border rounded-md text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                        touched.address && errors.address
                          ? 'bg-red-50/20 border-red-400 focus:border-red-500'
                          : 'bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:bg-white'
                      }`}
                    />
                    {touched.address && errors.address && (
                      <p className="font-mono text-[11px] text-red-600 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Timing */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Preferred Arrival Window
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                    >
                      <option value="ASAP / Soonest Available">Urgent / Soonest Available Today</option>
                      <option value="Today Morning (8am - 12pm)">Today Morning (8am – 12pm)</option>
                      <option value="Today Afternoon (12pm - 4pm)">Today Afternoon (12pm – 4pm)</option>
                      <option value="Tomorrow Morning">Tomorrow Morning</option>
                      <option value="Flexible Advance Scheduled Window">Flexible / Schedule for Later Date</option>
                    </select>
                  </div>

                  {/* Issue Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Problem Details / Symptoms <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Briefly describe what is leaking, draining slowly, or requiring repair..."
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#0a0a0a] text-white text-sm font-medium rounded-md hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      data-cursor-cta="true"
                    >
                      <span>Confirm & Book Service</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-3 text-center text-xs text-neutral-400 font-mono">
                      NO DEPOSIT REQUIRED · CONFIRMATION BY PHONE
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation Card */
              <div className="p-8 sm:p-12 rounded-[16px] border border-[#e5e7eb] bg-white text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-900">
                  <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-400">
                    Booking Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-normal text-neutral-900">
                    Your service request is in our dispatch queue.
                  </h3>
                </div>

                {/* Summary ticket */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 font-mono text-xs text-neutral-600 max-w-md mx-auto text-left space-y-2">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-400 uppercase">Dispatch Reference:</span>
                    <span className="font-semibold text-neutral-900">{dispatchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Customer:</span>
                    <span className="text-neutral-900">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Service:</span>
                    <span className="text-neutral-900">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Window:</span>
                    <span className="text-neutral-900">{preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Location:</span>
                    <span className="text-neutral-900">{address}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  A technician will contact you shortly at <span className="font-medium text-neutral-900">{phone}</span> to verify any specifics and notify you when en route.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="tel:6573002460"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-800 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call (657) 300-2460</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 border border-neutral-300 text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Book Another Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
