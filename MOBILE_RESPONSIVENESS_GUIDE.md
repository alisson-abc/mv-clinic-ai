# ClinicAI - Guia de Responsividade Mobile-First

## ✅ TODAS AS TELAS FORAM ATUALIZADAS!

### Telas Completas com Responsividade Mobile-First:
1. ✅ **Dashboard** - `/src/app/components/mv-dashboard.tsx`
2. ✅ **Pacientes** - `/src/app/components/mv-patients.tsx`
3. ✅ **Ask Sofya (Chat)** - `/src/app/components/mv-chat-sofya.tsx`
4. ✅ **Agenda** - `/src/app/components/mv-agenda.tsx`
5. ✅ **Notificações** - `/src/app/components/mv-notificacoes.tsx`
6. ✅ **Configurações** - `/src/app/components/mv-configuracoes.tsx`
7. ✅ **Sofya Floating (Orb)** - `/src/app/components/sofya-floating.tsx`

## Padrão de Responsividade Aplicado

### 1. **Header Responsivo**
```tsx
<header className="px-4 md:px-6 lg:px-8 py-3 md:py-4">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    {/* Mobile: Layout vertical */}
    {/* Desktop: Layout horizontal */}
  </div>
</header>
```

### 2. **Content Area com Padding Bottom**
```tsx
<div className="flex-1 overflow-y-auto pb-24">
  {/* pb-24 para espaço do Sofya Orb */}
</div>
```

### 3. **Grid Responsivo**
```tsx
{/* Stats/Cards */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">

{/* Layout Principal */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
  <div className="lg:col-span-2"> {/* Conteúdo principal */}
  <div className="lg:col-span-1"> {/* Sidebar/Panel */}
</div>
```

### 4. **Typography Responsiva**
```tsx
className="text-xl md:text-2xl"  {/* Títulos */}
className="text-xs md:text-sm"    {/* Subtítulos */}
className="text-[10px] md:text-xs" {/* Labels pequenos */}
```

### 5. **Padding/Spacing Responsivo**
```tsx
className="p-4 md:p-5 lg:p-6"     {/* Cards */}
className="gap-3 md:gap-4 lg:gap-6" {/* Gaps */}
className="mb-4 md:mb-6"           {/* Margem */}
```

### 6. **Botões e Touch Targets**
```tsx
className="w-10 h-10 md:w-12 md:h-12" {/* Mínimo 40px para touch */}
className="hover:bg-[...] active:bg-[...]" {/* Feedback visual mobile */}
```

### 7. **Elementos Ocultos no Mobile**
```tsx
className="hidden md:inline"  {/* Ocultar no mobile */}
className="md:hidden"          {/* Mostrar apenas no mobile */}
```

### 8. **Search Colapsável (Header)**
```tsx
const [showSearch, setShowSearch] = useState(false);

<button className="md:hidden" onClick={() => setShowSearch(!showSearch)}>
  <Search />
</button>

<div className={`${showSearch ? 'block' : 'hidden md:flex'}`}>
  {/* Campo de busca */}
</div>
```

## Breakpoints Tailwind
- **Mobile**: < 768px (padrão)
- **Tablet**: md: >= 768px
- **Desktop**: lg: >= 1024px

## Notas Importantes

1. **pb-24** no content area é essencial para não cobrir o Sofya Orb
2. Todos os grids devem começar com `grid-cols-1` no mobile
3. Textos devem ter variantes mobile (text-xs md:text-sm)
4. Botões devem ter feedback `active:` para touch
5. Use `min-w-0` e `truncate` para prevenir overflow de texto
6. `flex-shrink-0` em ícones e avatares
7. Search deve ser colapsável no header mobile