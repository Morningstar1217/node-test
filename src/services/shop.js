const memoryStorage = {
    '1001': { name: '店铺1' },
    '1002': { name: '店铺2' },
    '1003': { name: '店铺3' },
    '1004': { name: '店铺4' }
}

async function delay(ms = 200) {
    await new Promise((r) => {
        setTimeout(r, ms)
    })
}

class ShopService {
    async init() {
        await delay()
    }
    
    async find({ id, pageIndex = 0, pageSize = 10 }) {
        await delay()
        
        if (id) {
            return [memoryStorage[id]].filter(Boolean)
        }
        
        return Object.keys(memoryStorage)
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
            .map(id => ({ id, ...memoryStorage[id] }))
    }
    
    async modify({ id, values }) {
        await delay()
        
        const target = memoryStorage[id]
        
        if (!target) {
            return null
        }
        
        return Object.assign(target, values)
    }
    
    async remove({ id }) {
        await delay()
        
        const target = memoryStorage[id]
        
        if (!target) {
            return false
        }
        
        return delete memoryStorage[id]
    }
}

let service
module.exports = async function () {
    if (!service) {
        service = new ShopService()
        await service.init()
    }
    return service
}
