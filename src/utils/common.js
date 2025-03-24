export const updateFavorites = (id, favorites) => {
  if (!favorites || !Array.isArray(favorites)) {
    // Se favorites não existir ou não for um array, retornar um novo array só com o id
    return [id];
  }

  // Verificar se o id já existe nos favoritos
  if (favorites.includes(id)) {
    // Se existir, remover o id do array
    return favorites.filter((resId) => resId !== id);
  } else {
    // Se não existir, adicionar o id ao array (note o return que estava faltando)
    return [...favorites, id];
  }
};

export const checkFavorites = (id, favorites) => {
  return favorites?.includes(id) ? "#f51919" : "white";
};

export const validateString = (value) => {
return value?.lenght < 3 || value.length === null ? "Must have at least 3 caracteres": null
};
