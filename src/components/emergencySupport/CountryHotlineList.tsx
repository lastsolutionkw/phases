import { EmergencyContact } from '@/types';

export default function CountryHotlineList() {
  // Mock data for emergency contacts by country
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      country: 'United States',
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      type: 'suicide'
    },
    {
      id: '2',
      country: 'United States',
      name: 'Crisis Text Line',
      phone: '741741',
      type: 'crisis'
    },
    {
      id: '3',
      country: 'Canada',
      name: 'Talk Suicide Canada',
      phone: '1-833-456-4566',
      type: 'suicide'
    },
    {
      id: '4',
      country: 'United Kingdom',
      name: 'Samaritans',
      phone: '116 123',
      type: 'suicide'
    },
    {
      id: '5',
      country: 'Australia',
      name: 'Lifeline Australia',
      phone: '13 11 14',
      type: 'suicide'
    },
    {
      id: '6',
      country: 'Germany',
      name: 'Telefonseelsorge',
      phone: '0800 111 0 111',
      type: 'crisis'
    },
    {
      id: '7',
      country: 'France',
      name: 'SOS Amitié',
      phone: '09 72 39 40 50',
      type: 'crisis'
    },
    {
      id: '8',
      country: 'Japan',
      name: 'TELL Lifeline',
      phone: '03-5774-0992',
      type: 'crisis'
    },
    {
      id: '9',
      country: 'Saudi Arabia',
      name: 'Saudi Mental Health',
      phone: '920027797',
      type: 'general'
    },
    {
      id: '10',
      country: 'UAE',
      name: 'UAE Mental Health Support',
      phone: '800-HOPE',
      type: 'general'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suicide':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'crisis':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'general':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  // Group contacts by country
  const contactsByCountry = emergencyContacts.reduce((acc, contact) => {
    if (!acc[contact.country]) {
      acc[contact.country] = [];
    }
    acc[contact.country].push(contact);
    return acc;
  }, {} as Record<string, EmergencyContact[]>);

  return (
    <div className="space-y-6">
      {Object.entries(contactsByCountry).map(([country, contacts]) => (
        <div key={country} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span className="mr-2">🌍</span>
            {country}
          </h3>
          
          <div className="grid gap-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {contact.phone}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                        {contact.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                      title="Call"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    
                    {contact.whatsapp && (
                      <button
                        onClick={() => handleWhatsApp(contact.whatsapp!)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        title="WhatsApp"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add More Countries Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Don't see your country? Contact us to add local emergency resources, or search online for 
          "{'"your country"} suicide prevention hotline" or "{'"your country"} mental health crisis line".
        </p>
      </div>
    </div>
  );
}