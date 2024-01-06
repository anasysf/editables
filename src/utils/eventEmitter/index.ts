/**
 * A class representing an Event Emitter.
 * @typeParam M - The Events Map.
 *
 * @internal
 */
export default abstract class EventEmitter<
  M extends Record<PropertyKey, unknown>,
> extends EventTarget {
  /**
   * Emit an event.
   * @typeParam E - The event.
   * @typeParam D - The event details.
   * @param evt - The event.
   * @param details - The details sent with the event.
   *
   * @returns The parent class so you can be able to chain the events.
   */
  protected emit<E extends Extract<keyof M, PropertyKey>, D extends M[E]>(
    evt: E,
    details: D,
  ): this {
    super.dispatchEvent(new CustomEvent<D>(String(evt), { detail: details }));

    return this;
  }

  /**
   * Listen to an event.
   * @typeParam E - The event.
   * @typeParam D - The event details.
   * @param type - The event.
   * @param listener - The callback containing the event details as parameter.
   * @param options - The event listener options.
   *
   * @returns The parent class so you can be able to chain the events.
   */
  protected on<E extends Extract<keyof M, PropertyKey>, D extends M[E]>(
    type: E,
    listener: (evt: D) => EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): this {
    super.addEventListener(
      String(type),
      (evt): EventListenerOrEventListenerObject =>
        listener((evt as CustomEvent<D>).detail),
      options,
    );

    return this;
  }

  /**
   * Unlisten to an event.
   * @typeParam E - The event.
   * @typeParam D - The event details.
   * @param type - The event.
   * @param listener - The callback containing the event details as parameter.
   * @param options - The event listener options.
   *
   * @returns The parent class so you can be able to chain the events.
   */
  protected off<E extends Extract<keyof M, PropertyKey>, D extends M[E]>(
    type: E,
    listener: (evt: D) => EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): this {
    super.removeEventListener(
      String(type),
      (evt): EventListenerOrEventListenerObject =>
        listener((evt as CustomEvent<D>).detail),
      options,
    );

    return this;
  }
}
