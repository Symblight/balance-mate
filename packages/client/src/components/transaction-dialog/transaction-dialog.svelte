<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { PvDialog } from "pv-wc";
  import * as yup from "yup";

  import "./transaction-dialog.css";

  export let open = false;

  let dispatch = createEventDispatcher();

  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Amount is required")
      .test("not-zero", "Amount must not be zero", (value) => value !== 0),
    description: yup.string().required("Description is required"),
  });

  let dialog: PvDialog | null;
  let values = {
    amount: 0,
    description: "",
  };
  let errors: Record<string, string> = {};

  let isLoading = false;

  function clear() {
    open = false;
    isLoading = false;
    values = {
      amount: 0,
      description: "",
    };
    errors = {};
  }

  function handleChangeDialogAmountValue(e: any) {
    values.amount = e?.target.value;
  }
  function handleChangeDialogDescriptionValue(e: any) {
    values.description = e?.target.value;
  }

  async function handleSubmit() {
    isLoading = true;

    try {
      await schema.validate(
        {
          amount: Number(values.amount),
          description: values.description,
        },
        {
          abortEarly: false,
        },
      );

      dispatch("create", values);

      clear();
      open = false;
    } catch (err: unknown) {
      const yupErrors = err as yup.ValidationError;
      errors = Object.fromEntries(
        yupErrors.inner.map((item: yup.ValidationError) => [
          item.path,
          item.message,
        ]),
      );
    } finally {
      isLoading = false;
    }
  }

  $: {
    if (open) {
      dialog?.show();
    } else {
      dialog?.close();
    }
  }
</script>

<pv-dialog headerTitle="Add transaction" bind:this={dialog} on:closed={clear}>
  <form method="dialog" class="account-dialog__form">
    <div class="account-dialog__field">
      <label for="amount-field">Total amount:</label>
      <pv-text-field
        id="amount-field"
        type="number"
        placeholder="value"
        name="amount"
        required
        disabled={isLoading}
        value={values.amount}
        invalid={!!errors.amount}
        on:change={handleChangeDialogAmountValue}
      >
        {#if errors.amount}
          <span slot="help-text">{errors.amount}</span>
        {/if}
      </pv-text-field>
    </div>

    <div class="account-dialog__field">
      <label for="amount-description">Description:</label>
      <pv-text-field
        value={values.description}
        name="description"
        multiline
        disabled={isLoading}
        invalid={!!errors.description}
        required
        placeholder="description"
        id="amount-description"
        on:change={handleChangeDialogDescriptionValue}
      >
        {#if errors.description}
          <span slot="help-text">{errors.description}</span>
        {/if}
      </pv-text-field>
    </div>
  </form>
  <div slot="footer" class="account-dialog__footer">
    <pv-button
      formmethod="dialog"
      variant="secondary"
      role="button"
      tabindex="0"
      disabled={isLoading}
      on:click={clear}
      on:keydown={clear}
    >
      Cancel
    </pv-button>
    <pv-button
      variant="primary"
      role="button"
      type="button"
      tabindex="0"
      disabled={isLoading}
      loading={isLoading}
      on:click={handleSubmit}
      on:keydown={handleSubmit}
    >
      Create
    </pv-button>
  </div>
</pv-dialog>
