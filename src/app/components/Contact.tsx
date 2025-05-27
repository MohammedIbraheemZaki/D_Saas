'use client';

import { useState } from 'react';
// import { useLanguage } from '@/providers/LanguageProvider';

import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
// import { useToast } from '../[locale]/hooks/useToast';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/textarea';
import Button from '@/app/components/ui/Button';
import { useI18n } from '@/i18n/client';
import { useCurrentLocale } from '@/i18n/client';

export default function Contact() {
//   const { language } = useLanguage();
  // const { toast } = useToast();
  const t = useI18n();
  const locale = useCurrentLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
    let isValid = true;

    if (!formData.name) {
      errors.name = t('errors.required').replace('{field}', t('contact.name'));
      isValid = false;
    }

    if (!formData.email) {
      errors.email = t('errors.required').replace('{field}', t('contact.email'));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('errors.emailFormat');
      isValid = false;
    }

    if (!formData.subject) {
      errors.subject = t('errors.required').replace('{field}', t('contact.subject'));
      isValid = false;
    }

    if (!formData.message) {
      errors.message = t('errors.required').replace('{field}', t('contact.message'));
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // TODO: Implement contact form submission
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section dir={locale === 'ar' ? 'rtl' : 'ltr'} id="contact" className="bg-[#f8f8f8] pt-16 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <Input
              required
              label={t('contact.name')}
              placeholder={t('contact.name')}
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
            />
            <Input
              required
              type="email"
              label={t('contact.email')}
              placeholder={t('contact.email')}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
            />
            <Input
              required
              label={t('contact.subject')}
              placeholder={t('contact.subject')}
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              error={validationErrors.subject}
            />
            <Textarea
              required
              label={t('contact.message')}
              placeholder={t('contact.message')}
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              error={validationErrors.message}
            />
            <Button type="submit" variant="primary" className="w-full">
              {t('contact.submit')}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-blue-600 font-semibold text-lg mb-2 block">{t('contact.contactUs') || 'Contact Us'}</span>
              <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
              <p className="text-gray-500 mb-8 max-w-md">{t('contact.description')}</p>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <div>
                    <span className="font-semibold">{t('contact.callUs') || 'Call Us'}</span>
                    <p className="text-gray-500">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <span className="font-semibold">{t('contact.emailUs') || 'Email Us'}</span>
                    <p className="text-gray-500">contact@saasbolt.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <div>
                    <span className="font-semibold">{t('contact.website') || 'Website'}</span>
                    <p className="text-gray-500">www.saaswebsite.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <span className="font-semibold">{t('contact.address')}</span>
                    <p className="text-gray-500">98 Woking St, REQ, PKJ 23645</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <span className="font-semibold text-gray-700 mr-2">{t('contact.followUs') || 'Follow Us On'}</span>
                <div className="flex gap-3 mt-2">
                  <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-700"><Facebook /></a>
                  <a href="#" aria-label="Twitter" className="text-blue-600 hover:text-blue-700"><Twitter /></a>
                  <a href="#" aria-label="LinkedIn" className="text-blue-600 hover:text-blue-700"><Linkedin /></a>
                  <a href="#" aria-label="Instagram" className="text-blue-600 hover:text-blue-700"><Instagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="container mx-auto mt-12">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.64623262544!2d-0.1356382!3d51.4974941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052e8e8e8e8e%3A0x8e8e8e8e8e8e8e8e!2sLondon!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}