type CallbackEvent = <Data>(data: Data) => void;

export class EventEmitter {
    private eventsMap = new Map<string, Set<CallbackEvent>>();

    emit = <Data>(name: string, data: Data) => {
        const events = this.eventsMap.get(name) || new Set();

        const values = Array.from(events.values());

        for (const callback of values) {
            callback(data);
        }
    };

    on = <Callback extends CallbackEvent>(name: string, callback: Callback) => {
        const events = this.eventsMap.get(name) || new Set();

        this.eventsMap.set(name, events.add(callback));

        return () => {
            events.delete(callback);
        };
    };

    off = <Callback extends CallbackEvent>(name: string, callback: Callback) => {
        const events = this.eventsMap.get(name);

        events?.delete(callback);
    };

    clear = () => {
        this.eventsMap.clear();
    };
}
