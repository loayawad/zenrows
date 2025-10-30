import { supabaseServer } from '../src/utils/supabaseServer';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import Scene from './scene';

export default async function Page() {
  const { data: origins } = await supabaseServer.from('origins').select('*');
  const { data: destinations } = await supabaseServer.from('destinations').select('*');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-8">
        <Scene origins={origins || []} destinations={destinations || []} />
      </main>
      <section className="w-full bg-white py-16 px-8 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Didn't see your target website?
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            We can scrape any website on the internet. Try it out for free!
          </p>
          <div className="max-w-xl mx-auto">
            <label className="block text-left text-xs text-gray-600 mb-2 font-medium">
              URL to Scrape
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://www.amazon.com/b/ref=dp_bc_aui_C_4?ie=UTF8"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled
              />
              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-normal transition whitespace-nowrap">
                Scrape URL
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


