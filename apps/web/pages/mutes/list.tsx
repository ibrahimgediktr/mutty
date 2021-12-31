import { useEffect, useRef, useState } from "react";

const MuteList = () => {
  const [muteCategories, setMuteCategories] = useState([]);
  const [myMutedKeywords, setMyMutedKeywords] = useState([]);

  const getCategories = () => {
    const loadedMutes = myMutedKeywords.filter(keyword => keyword.indexOf('mutty:') > -1).map(keyword => keyword.replace('mutty:', ''));

    return muteCategories.map(category => {
      category.selected = loadedMutes.includes(category.key);
      return category;
    })
  };

  const mute = async (category) => {
    const result = await fetch(`/mute-dictionaries/tr/${category.topicKey}/${category.key}.json`).then(res => res.json());
    const requests = [];

    for (const keyword of result) {
      requests.push(fetch('/api/mutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword
        })
      }))
    }

    await Promise.all(requests);

    await requests.push(fetch('/api/mutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: `mutty:${category.key}`
      })
    }))

    window.location.reload();
  }

  useEffect(() => {
    const fetchAllMuteList = async () => {
      const [categories, { muted_keywords }] = await Promise.all(
        [
          fetch('/mute-dictionaries/tr/categories.json', {
            method: 'GET'
          }).then(res => res.json()),

          fetch('/api/mutes', {
            method: 'GET'
          }).then(res => res.json())
        ]
      );

      setMuteCategories(categories);
      setMyMutedKeywords(muted_keywords.map(mutedKeyword => mutedKeyword.keyword));
    };
    fetchAllMuteList();
  }, []);

  return (
    <div className="h-screen">
      <p className="text-center text-4xl font-semibold py-4">Mutty Lists</p>
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
          {getCategories().map((category, index) => (
            <div key={`category-${index}`} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
              <div className="p-5">
                <a href="#">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{category.name}</h5>
                </a>
                <p className="font-normal text-gray-700 mb-3">{category.description}</p>
                <button onClick={() => mute(category)} disabled={category.selected} type="button" className="text-white bg-blue-700 disabled:bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                  Mute It!
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MuteList;
