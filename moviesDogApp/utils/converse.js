export const typeConverse = (data) => {
    const typeList = {
        Comedy: '喜剧',
        Romance: '爱情',
        Action: '动作',
        Science_Fiction: '科幻',
        Animation: '动画',
        Mystery: '悬疑',
        Crime: '犯罪',
        adventure: '冒险',
        Horror: '恐怖',
        War: '战争',
        Martial_Arts: '武侠',
        Disaster: '灾难',
        Youth: '青春',
        Family: '家庭',
        Plot: '剧情',
        '3D': '3D',
        IMAX: 'IMAX',
        Dolby: '杜比全景声',
        "other": "其他",
        'China': '中国',
        'EuUSA': '欧美',
        'Japan': '日本',
        'Korea': '韩国',
        "Mandarin": "国语",
        "Cantonese": "粤语",
        "English": "英语",
        "Japanese": "日语",
        "Korean": "韩语",
        "Russian": "俄语",
    }
    if (typeof data === 'object') {
        let translatedWords = data.map(word => typeList[word] || word);
        translatedWords = removeItemFromArray(translatedWords, 'IMAX')
        translatedWords = removeItemFromArray(translatedWords, '3D')
        translatedWords = removeItemFromArray(translatedWords, '杜比全景声')
        // console.log(translatedWords);
        return translatedWords
    } else {
        let word = typeList[data] || data
        return word
    }
    
}

const removeItemFromArray = (array, item) => {
    return array.filter(element => element !== item);
}